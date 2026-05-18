import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import playersRoute   from './routes/players.route';
import matchesRoute   from './routes/matches.route';
import sessionsRoute  from './routes/sessions.route';
import statsRoute     from './routes/stats.route';
import analyticsRoute from './routes/analytics.route';

const app  = express();
const PORT = process.env['PORT'] ?? 3000;
const MONGO_URI = process.env['MONGO_URI'] ?? 'mongodb://localhost:27017/gaming_dashboard';

app.use(cors());
app.use(express.json());

app.use('/api/players',   playersRoute);
app.use('/api/matches',   matchesRoute);
app.use('/api/sessions',  sessionsRoute);
app.use('/api/stats',     statsRoute);
app.use('/api/analytics', analyticsRoute);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
