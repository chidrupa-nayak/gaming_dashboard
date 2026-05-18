import { Router } from 'express';
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { reRankPlayers } from '../utils/rerank';

const router = Router();

const WIN_POINTS = 500;

router.get('/', async (req, res) => {
  const mode = req.query['mode'] as string | undefined;
  const filter = mode && mode !== 'All' ? { mode: mode as 'Ranked' | 'Casual' | 'Tournament' } : {};
  const matches = await Match.find(filter).sort({ _id: -1 }).select('-__v');
  res.json(matches);
});

router.post('/', async (req, res) => {
  const { player1, player2, winner, mode, score, duration } = req.body as {
    player1: string; player2: string; winner: string;
    mode: 'Ranked' | 'Casual' | 'Tournament';
    score: string; duration: string;
  };

  const loserName = winner === player1 ? player2 : player1;

  const count = await Match.countDocuments();
  const match = await Match.create({
    id: `M-${1043 + count}`,
    player1, player2, winner, mode, score, duration,
    date: new Date().toISOString(),
  });

  // Update winner and loser stats in parallel
  const [winnerDoc, loserDoc] = await Promise.all([
    Player.findOne({ name: winner }),
    Player.findOne({ name: loserName }),
  ]);

  if (winnerDoc) {
    winnerDoc.wins  += 1;
    winnerDoc.score += WIN_POINTS;
    const total = winnerDoc.wins + winnerDoc.losses;
    winnerDoc.winRate = Math.round((winnerDoc.wins / total) * 100);
    await winnerDoc.save();
  }

  if (loserDoc) {
    loserDoc.losses += 1;
    const total = loserDoc.wins + loserDoc.losses;
    loserDoc.winRate = Math.round((loserDoc.wins / total) * 100);
    await loserDoc.save();
  }

  await reRankPlayers();

  res.status(201).json(match);
});

export default router;
