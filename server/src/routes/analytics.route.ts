import { Router } from 'express';
import { Match }   from '../models/match.model';
import { Player }  from '../models/player.model';
import { Session } from '../models/session.model';

const router = Router();

router.get('/', async (_req, res) => {
  const [modeCounts, topWinRateDoc, topRankedDoc, sessions, totalMatches] = await Promise.all([
    Match.aggregate([{ $group: { _id: '$mode', count: { $sum: 1 } } }]),
    Player.findOne().sort({ winRate: -1 }).select('name winRate'),
    Player.findOne({ rank: 1 }).select('name score'),
    Session.find().select('date sessions'),
    Match.countDocuments(),
  ]);

  const byMode: Record<string, number> = { Ranked: 0, Casual: 0, Tournament: 0 };
  for (const { _id, count } of modeCounts) {
    if (_id in byMode) byMode[_id] = count;
  }

  const peakSession = sessions.reduce(
    (best, s) => (s.sessions > best.sessions ? s : best),
    sessions[0] ?? { date: '—', sessions: 0 }
  );

  res.json({
    matchesByMode: byMode,
    totalMatches,
    mostActiveDay: peakSession.date,
    topWinRate:  topWinRateDoc  ? { name: topWinRateDoc.name,  rate:  topWinRateDoc.winRate  } : null,
    topRanked:   topRankedDoc   ? { name: topRankedDoc.name,   score: topRankedDoc.score      } : null,
  });
});

export default router;
