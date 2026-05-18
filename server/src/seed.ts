import 'dotenv/config';
import mongoose from 'mongoose';
import { Player } from './models/player.model';
import { Match }  from './models/match.model';
import { Session } from './models/session.model';

const MONGO_URI = process.env['MONGO_URI'] ?? 'mongodb://localhost:27017/gaming_dashboard';

const players = [
  { rank: 1, name: 'Virat Kohli',    score: 51200, wins: 158, losses: 22, winRate: 88, avatar: 'V' },
  { rank: 2, name: 'Rohit Sharma',   score: 46800, wins: 141, losses: 30, winRate: 82, avatar: 'R' },
  { rank: 3, name: 'MS Dhoni',       score: 42350, wins: 132, losses: 35, winRate: 79, avatar: 'M' },
  { rank: 4, name: 'Jasprit Bumrah', score: 37900, wins: 110, losses: 44, winRate: 71, avatar: 'J' },
  { rank: 5, name: 'Ravindra Jadeja',score: 34100, wins: 101, losses: 51, winRate: 66, avatar: 'R' },
  { rank: 6, name: 'KL Rahul',       score: 30500, wins:  93, losses: 58, winRate: 62, avatar: 'K' },
  { rank: 7, name: 'Hardik Pandya',  score: 27200, wins:  85, losses: 67, winRate: 56, avatar: 'H' },
  { rank: 8, name: 'Shubman Gill',   score: 23800, wins:  76, losses: 74, winRate: 51, avatar: 'S' },
];

const sessions = [
  { date: 'Mon', sessions: 340 },
  { date: 'Tue', sessions: 480 },
  { date: 'Wed', sessions: 420 },
  { date: 'Thu', sessions: 610 },
  { date: 'Fri', sessions: 780 },
  { date: 'Sat', sessions: 920 },
  { date: 'Sun', sessions: 860 },
];

const ago = (mins: number) => new Date(Date.now() - mins * 60_000).toISOString();

const matches = [
  { id: 'M-1042', player1: 'Virat Kohli',     player2: 'Rohit Sharma',    winner: 'Virat Kohli',     mode: 'Ranked',     duration: '14:22', score: '3-1', date: ago(2)   },
  { id: 'M-1041', player1: 'MS Dhoni',         player2: 'Jasprit Bumrah',  winner: 'MS Dhoni',         mode: 'Casual',     duration: '08:54', score: '3-0', date: ago(8)   },
  { id: 'M-1040', player1: 'Ravindra Jadeja',  player2: 'Shubman Gill',    winner: 'Ravindra Jadeja',  mode: 'Tournament', duration: '21:07', score: '3-2', date: ago(15)  },
  { id: 'M-1039', player1: 'KL Rahul',         player2: 'Hardik Pandya',   winner: 'Hardik Pandya',    mode: 'Ranked',     duration: '11:33', score: '2-3', date: ago(22)  },
  { id: 'M-1038', player1: 'Virat Kohli',      player2: 'MS Dhoni',        winner: 'Virat Kohli',      mode: 'Ranked',     duration: '17:45', score: '3-1', date: ago(34)  },
  { id: 'M-1037', player1: 'Rohit Sharma',     player2: 'KL Rahul',        winner: 'Rohit Sharma',     mode: 'Casual',     duration: '09:12', score: '3-0', date: ago(41)  },
  { id: 'M-1036', player1: 'Jasprit Bumrah',   player2: 'Shubman Gill',    winner: 'Jasprit Bumrah',   mode: 'Tournament', duration: '19:58', score: '3-2', date: ago(60)  },
  { id: 'M-1035', player1: 'Ravindra Jadeja',  player2: 'Hardik Pandya',   winner: 'Ravindra Jadeja',  mode: 'Ranked',     duration: '12:21', score: '3-1', date: ago(72)  },
  { id: 'M-1034', player1: 'Shubman Gill',     player2: 'KL Rahul',        winner: 'KL Rahul',         mode: 'Casual',     duration: '07:44', score: '1-3', date: ago(88)  },
  { id: 'M-1033', player1: 'Hardik Pandya',    player2: 'Virat Kohli',     winner: 'Virat Kohli',      mode: 'Tournament', duration: '23:11', score: '2-3', date: ago(120) },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected — seeding…');

  await Promise.all([
    Player.deleteMany({}),
    Match.deleteMany({}),
    Session.deleteMany({}),
  ]);

  await Promise.all([
    Player.insertMany(players),
    Match.insertMany(matches),
    Session.insertMany(sessions),
  ]);

  console.log('Seeded: 8 Indian cricket players, 10 matches, 7 sessions');
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
