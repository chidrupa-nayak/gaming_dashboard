import { Router } from 'express';
import { Player } from '../models/player.model';
import { Match } from '../models/match.model';
import { Session } from '../models/session.model';

const router = Router();

router.get('/', async (_req, res) => {
  const [totalPlayers, totalMatches, sessions, topPlayer] = await Promise.all([
    Player.countDocuments(),
    Match.countDocuments(),
    Session.find().select('-__v'),
    Player.findOne().sort({ score: -1 }).select('score'),
  ]);

  const weeklySessions = sessions.reduce((sum, s) => sum + s.sessions, 0);
  const topScore       = topPlayer?.score ?? 0;

  res.json([
    { label: 'Total Players',   value: totalPlayers.toLocaleString(),   icon: '👥', color: 'purple' },
    { label: 'Weekly Sessions', value: weeklySessions.toLocaleString(), icon: '🎮', color: 'green'  },
    { label: 'Total Matches',   value: totalMatches.toLocaleString(),   icon: '⚔️',  color: 'blue'   },
    { label: 'Top Score',       value: topScore.toLocaleString(),       icon: '🏆', color: 'orange' },
  ]);
});

export default router;
