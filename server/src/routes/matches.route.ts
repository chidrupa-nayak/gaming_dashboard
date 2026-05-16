import { Router } from 'express';
import { Match } from '../models/match.model';

const router = Router();

router.get('/', async (req, res) => {
  const mode = req.query['mode'] as string | undefined;
  const filter = mode && mode !== 'All' ? { mode: mode as 'Ranked' | 'Casual' | 'Tournament' } : {};
  const matches = await Match.find(filter).sort({ _id: -1 }).select('-__v');
  res.json(matches);
});

export default router;
