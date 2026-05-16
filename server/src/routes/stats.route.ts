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

  const activeSessions = sessions.at(-1)?.sessions ?? 0;
  const topScore       = topPlayer?.score ?? 0;

  res.json([
    { label: 'Total Players',   value: totalPlayers.toLocaleString(), change: 8.2,  icon: '👥', color: 'purple' },
    { label: 'Active Sessions', value: activeSessions.toString(),     change: 12.5, icon: '🎮', color: 'green'  },
    { label: 'Total Matches',   value: totalMatches.toLocaleString(), change: 5.1,  icon: '⚔️',  color: 'blue'   },
    { label: 'Top Score',       value: topScore.toLocaleString(),     change: 3.7,  icon: '🏆', color: 'orange' },
  ]);
});

export default router;
