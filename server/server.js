import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/admk_portal';

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static directory for uploaded files
const publicAssets = path.resolve(__dirname, '../public/assets');
app.use('/assets', express.static(publicAssets));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// MongoDB Connection with graceful retry
console.log('Connecting to MongoDB at:', MONGODB_URI);
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 4000
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully to database:', mongoose.connection.name);
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection warning:', err.message);
    console.warn('💡 Tip: If using MongoDB Atlas, set MONGODB_URI="mongodb+srv://..." in server/.env');
    console.warn('💡 If using local MongoDB, ensure your mongod service is started.');
  });

app.listen(PORT, () => {
  console.log(`🚀 MLA Portal Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - Auth:       http://localhost:${PORT}/api/auth/login`);
  console.log(`   - News:       http://localhost:${PORT}/api/news`);
  console.log(`   - Events:     http://localhost:${PORT}/api/events`);
  console.log(`   - Activities: http://localhost:${PORT}/api/activities`);
  console.log(`   - Upload:     http://localhost:${PORT}/api/upload`);
});
