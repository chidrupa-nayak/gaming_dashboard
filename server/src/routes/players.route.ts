import { Router } from 'express';
import { Player } from '../models/player.model';

const router = Router();

router.get('/', async (_req, res) => {
  const players = await Player.find().sort({ rank: 1 }).select('-__v');
  res.json(players);
});

router.get('/:id', async (req, res) => {
  const player = await Player.findById(req.params['id']).select('-__v');
  if (!player) { res.status(404).json({ message: 'Player not found' }); return; }
  res.json(player);
});

export default router;
