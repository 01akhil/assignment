import express from 'express';
import cors from 'cors';
import { MikroORM } from '@mikro-orm/core';
import dotenv from 'dotenv';
import axios from 'axios';
import { RequestHistory } from './entities/RequestHistory.js';
import mikroOrmConfig from './mikro-orm.config.js';
import 'dotenv/config';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());

app.use(cors({
  origin: 'https://assignment-blond-xi.vercel.app',
  credentials: true // if you're using cookies or auth headers
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

let orm;

// Initialize MikroORM
async function initializeORM() {
  try {
    orm = await MikroORM.init(mikroOrmConfig);
    console.log('Connected to MongoDB via MikroORM');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
}

// Make HTTP requests
app.post('/api/request', async (req, res) => {
  const em = orm.em.fork();

  const { method = 'GET', url, headers = {}, body = '', params = {} } = req.body;

  const startTime = Date.now();

  try {
    const response = await axios({
      method,
      url,
      headers,
      data: body,
      params,
    });

    const responseTime = Date.now() - startTime;
    const responseData = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body: response.data,
    };

    const requestHistory = em.create(RequestHistory, {
      method: method.toUpperCase(),
      url,
      headers,
      body,
      params,
      response: responseData,
      status: response.status,
      responseTime,
      createdAt: new Date(),
    });

    await em.persistAndFlush(requestHistory);

    res.json(responseData);
  } catch (error) {
    const responseTime = Date.now() - startTime;

    const requestHistory = em.create(RequestHistory, {
      method: method.toUpperCase(),
      url,
      headers,
      body,
      params,
      response: {
        error: error.message,
        status: error.response?.status || 0,
        statusText: error.response?.statusText || 'Network Error',
      },
      status: error.response?.status || 0,
      responseTime,
      createdAt: new Date(),
    });

    await em.persistAndFlush(requestHistory);

    res.status(error.response?.status || 500).json({
      error: error.message,
    });
  }
});



// Get request history with pagination
app.get('/api/history', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const em = orm.em.fork();
    
    const [history, total] = await em.findAndCount(RequestHistory, {}, {
      orderBy: { createdAt: -1 },
      limit,
      offset
    });

    res.json({
      success: true,
      data: history,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get specific request by ID
app.get('/api/history/:id', async (req, res) => {
  try {
    const em = orm.em.fork();
    const request = await em.findOne(RequestHistory, req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Request fetch error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete request from history
app.delete('/api/history/:id', async (req, res) => {
  try {
    const em = orm.em.fork();
    const request = await em.findOne(RequestHistory, req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }

    await em.removeAndFlush(request);

    res.json({
      success: true,
      message: 'Request deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Clear all history
app.delete('/api/history', async (req, res) => {
  try {
    const em = orm.em.fork();
    await em.nativeDelete(RequestHistory, {});

    res.json({
      success: true,
      message: 'History cleared successfully'
    });
  } catch (error) {
    console.error('Clear history error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Search history
app.get('/api/history/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const em = orm.em.fork();
    
    const searchFilter = {
      $or: [
        { url: { $regex: query, $options: 'i' } },
        { method: { $regex: query, $options: 'i' } }
      ]
    };

    const [history, total] = await em.findAndCount(RequestHistory, searchFilter, {
      orderBy: { createdAt: -1 },
      limit,
      offset
    });

    res.json({
      success: true,
      data: history,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await initializeORM();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch(console.error);