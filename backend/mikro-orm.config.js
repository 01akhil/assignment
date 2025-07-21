// export default {
//   entities: ['./entities/*'],
//   dbName: process.env.MONGODB_NAME || 'rest_client_db',
//   clientUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017',
//   type: 'mongo',
//   debug: process.env.NODE_ENV !== 'production',
//   allowGlobalContext: true,
// };


// import { RequestHistory } from './entities/RequestHistory.js';

// export default {
//   entities: [RequestHistory],
//   dbName: process.env.MONGODB_NAME || 'rest_client_db',
//   clientUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017',
//   type: 'mongo',
//   debug: process.env.NODE_ENV !== 'production',
//   allowGlobalContext: true,
// };




// const { defineConfig } = require('@mikro-orm/mongodb');

// module.exports = defineConfig({
//   entities: ['./entities/*'],
//   dbName: process.env.MONGODB_NAME || 'rest_client_db',
//   clientUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017',
//   driverOptions: {},
//   debug: process.env.NODE_ENV !== 'production',
//   allowGlobalContext: true,
// });



// import { defineConfig } from '@mikro-orm/mongodb';

// export default defineConfig({
//   // same config
//   entities: ['./entities/*'],
//   dbName: process.env.MONGODB_NAME || 'rest_client_db',
//   clientUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017',
//   driverOptions: {},
//   debug: process.env.NODE_ENV !== 'production',
//   allowGlobalContext: true,
// });


import { defineConfig } from '@mikro-orm/mongodb';

export default defineConfig({
  entities: ['./entities/*'],
  dbName: process.env.MONGODB_NAME || 'rest_client_db',
  clientUrl: 'mongodb+srv://bhadula245:1A27yD39cuypUu9F@assignment.qd2du9x.mongodb.net/rest_client_db?retryWrites=true&w=majority&appName=assignment',
  
  driverOptions: {
    // Extra optional options if needed
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  debug: process.env.NODE_ENV !== 'production',
  allowGlobalContext: true,
});

