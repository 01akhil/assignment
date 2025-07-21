// useHistory.js
import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'https://assignment-backend-aykw.onrender.com';

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchHistory = useCallback(async (page = 1, search = '') => {
    try {
      const url = search 
        ? `${API_BASE}/history/search/${encodeURIComponent(search)}?page=${page}&limit=20`
        : `${API_BASE}/history?page=${page}&limit=20`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setHistory(data.data);
        setHistoryTotal(data.pagination.total);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  }, []);

  useEffect(() => {
    fetchHistory(historyPage, searchQuery);
  }, [historyPage, searchQuery, fetchHistory]);

  const loadFromHistory = (request) => {
    const headerArray = Object.entries(request.headers || {}).map(([key, value]) => ({
      key, value, enabled: true
    }));
    const paramArray = Object.entries(request.params || {}).map(([key, value]) => ({
      key, value, enabled: true
    }));
    
    return {
      method: request.method,
      url: request.url,
      headers: headerArray.length ? headerArray : [{ key: '', value: '', enabled: true }],
      params: paramArray.length ? paramArray : [{ key: '', value: '', enabled: true }],
      body: request.body || ''
    };
  };

  const deleteFromHistory = async (id) => {
    try {
      await fetch(`${API_BASE}/history/${id}`, { method: 'DELETE' });
      fetchHistory(historyPage, searchQuery);
    } catch (error) {
      console.error('Failed to delete request:', error);
    }
  };

  const clearHistory = async () => {
    if (confirm('Are you sure you want to clear all history?')) {
      try {
        await fetch(`${API_BASE}/history`, { method: 'DELETE' });
        fetchHistory(1, searchQuery);
      } catch (error) {
        console.error('Failed to clear history:', error);
      }
    }
  };

  return {
    history,
    historyTotal,
    searchQuery,
    setSearchQuery,
    historyPage,
    setHistoryPage,
    loadFromHistory,
    deleteFromHistory,
    clearHistory,
    fetchHistory
  };
};