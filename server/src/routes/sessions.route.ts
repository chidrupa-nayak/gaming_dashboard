import { Router } from 'express';
import { Session } from '../models/session.model';

const router = Router();

router.get('/', async (_req, res) => {
  const sessions = await Session.find().select('-__v');
  res.json(sessions);
});

export default router;
