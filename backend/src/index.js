const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const storiesRoutes = require('./routes/stories');
const adminRoutes = require('./routes/admin');
const interactionsRoutes = require('./routes/interactions');
const { createTables } = require('./db/migrate');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CLIFF Backend API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/interactions', interactionsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    console.log('🔄 Initializing database...');
    await createTables();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
