import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import matchRoutes from './routes/matchRoutes.js';
import pointsRoutes from './routes/pointsRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import playerStatsRoutes from './routes/playerStatsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import fullmatchRoutes from './routes/fullmatchRoutes.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}));


// All Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/points', pointsRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/stats', playerStatsRoutes);
app.use('/api', fullmatchRoutes);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
