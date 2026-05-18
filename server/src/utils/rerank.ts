import { Player } from '../models/player.model';

/**
 * Re-ranks every player by score DESC, wins DESC as tiebreaker.
 * Players tied on both fields share the same rank (competition ranking: 1,1,3…).
 */
export async function reRankPlayers(): Promise<void> {
  const players = await Player.find().sort({ score: -1, wins: -1 });

  let rank = 1;
  const updates = players.map((p, i) => {
    if (i > 0) {
      const prev = players[i - 1];
      if (p.score !== prev.score || p.wins !== prev.wins) rank = i + 1;
    }
    return Player.updateOne({ _id: p._id }, { rank });
  });

  await Promise.all(updates);
}
