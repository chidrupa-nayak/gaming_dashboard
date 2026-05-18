import { Router } from 'express';
import { Player } from '../models/player.model';
import { reRankPlayers } from '../utils/rerank';

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

router.post('/', async (req, res) => {
  const { name } = req.body as { name: string };
  const count = await Player.countDocuments();

  const player = await Player.create({
    rank:    count + 1,   // provisional — reRankPlayers will correct it
    name,
    score:   0,
    wins:    0,
    losses:  0,
    winRate: 0,
    avatar:  name[0].toUpperCase(),
  });

  await reRankPlayers();

  // Return the player with its corrected rank
  const updated = await Player.findById(player._id).select('-__v');
  res.status(201).json(updated);
});

export default router;
