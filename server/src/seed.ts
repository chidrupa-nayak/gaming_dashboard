import 'dotenv/config';
import mongoose from 'mongoose';
import { Player } from './models/player.model';
import { Match }  from './models/match.model';
import { Session } from './models/session.model';

const MONGO_URI = process.env['MONGO_URI'] ?? 'mongodb://localhost:27017/gaming_dashboard';

const players = [
  { rank: 1, name: 'NightHawk99',  score: 48320, wins: 142, losses: 23, winRate: 86, avatar: 'N' },
  { rank: 2, name: 'ShadowByte',   score: 44105, wins: 128, losses: 31, winRate: 80, avatar: 'S' },
  { rank: 3, name: 'PixelVortex',  score: 39870, wins: 115, losses: 40, winRate: 74, avatar: 'P' },
  { rank: 4, name: 'StarlightX',   score: 36450, wins: 102, losses: 45, winRate: 69, avatar: 'S' },
  { rank: 5, name: 'IronCircuit',  score: 33200, wins:  98, losses: 52, winRate: 65, avatar: 'I' },
  { rank: 6, name: 'CryptoFang',   score: 29900, wins:  91, losses: 60, winRate: 60, avatar: 'C' },
  { rank: 7, name: 'QuantumPulse', score: 27450, wins:  87, losses: 65, winRate: 57, avatar: 'Q' },
  { rank: 8, name: 'NeonRaider',   score: 24800, wins:  80, losses: 70, winRate: 53, avatar: 'N' },
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

const matches = [
  { id: 'M-1042', player1: 'NightHawk99',  player2: 'ShadowByte',   winner: 'NightHawk99',  mode: 'Ranked',     duration: '14:22', score: '3-1', date: '2 min ago'  },
  { id: 'M-1041', player1: 'PixelVortex',  player2: 'IronCircuit',  winner: 'PixelVortex',  mode: 'Casual',     duration: '08:54', score: '3-0', date: '8 min ago'  },
  { id: 'M-1040', player1: 'StarlightX',   player2: 'NeonRaider',   winner: 'StarlightX',   mode: 'Tournament', duration: '21:07', score: '3-2', date: '15 min ago' },
  { id: 'M-1039', player1: 'CryptoFang',   player2: 'QuantumPulse', winner: 'QuantumPulse', mode: 'Ranked',     duration: '11:33', score: '2-3', date: '22 min ago' },
  { id: 'M-1038', player1: 'NightHawk99',  player2: 'PixelVortex',  winner: 'NightHawk99',  mode: 'Ranked',     duration: '17:45', score: '3-1', date: '34 min ago' },
  { id: 'M-1037', player1: 'ShadowByte',   player2: 'CryptoFang',   winner: 'ShadowByte',   mode: 'Casual',     duration: '09:12', score: '3-0', date: '41 min ago' },
  { id: 'M-1036', player1: 'IronCircuit',  player2: 'NeonRaider',   winner: 'IronCircuit',  mode: 'Tournament', duration: '19:58', score: '3-2', date: '1h ago'     },
  { id: 'M-1035', player1: 'StarlightX',   player2: 'QuantumPulse', winner: 'StarlightX',   mode: 'Ranked',     duration: '12:21', score: '3-1', date: '1h 12m ago' },
  { id: 'M-1034', player1: 'NeonRaider',   player2: 'CryptoFang',   winner: 'CryptoFang',   mode: 'Casual',     duration: '07:44', score: '1-3', date: '1h 28m ago' },
  { id: 'M-1033', player1: 'QuantumPulse', player2: 'NightHawk99',  winner: 'NightHawk99',  mode: 'Tournament', duration: '23:11', score: '2-3', date: '2h ago'     },
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

  console.log('Seeded: 8 players, 10 matches, 7 sessions');
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
