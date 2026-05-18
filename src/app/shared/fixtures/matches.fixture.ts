import { Match } from '../models/game.models';

const ago = (mins: number) => new Date(Date.now() - mins * 60_000).toISOString();

export const MATCHES: Match[] = [
  { id: 'M-1042', player1: 'Virat Kohli',    player2: 'Rohit Sharma',    winner: 'Virat Kohli',    mode: 'Ranked',     duration: '14:22', score: '3-1', date: ago(2)   },
  { id: 'M-1041', player1: 'MS Dhoni',        player2: 'Jasprit Bumrah',  winner: 'MS Dhoni',        mode: 'Casual',     duration: '08:54', score: '3-0', date: ago(8)   },
  { id: 'M-1040', player1: 'Ravindra Jadeja', player2: 'Shubman Gill',    winner: 'Ravindra Jadeja', mode: 'Tournament', duration: '21:07', score: '3-2', date: ago(15)  },
  { id: 'M-1039', player1: 'KL Rahul',        player2: 'Hardik Pandya',   winner: 'Hardik Pandya',   mode: 'Ranked',     duration: '11:33', score: '2-3', date: ago(22)  },
  { id: 'M-1038', player1: 'Virat Kohli',     player2: 'MS Dhoni',        winner: 'Virat Kohli',     mode: 'Ranked',     duration: '17:45', score: '3-1', date: ago(34)  },
  { id: 'M-1037', player1: 'Rohit Sharma',    player2: 'KL Rahul',        winner: 'Rohit Sharma',    mode: 'Casual',     duration: '09:12', score: '3-0', date: ago(41)  },
  { id: 'M-1036', player1: 'Jasprit Bumrah',  player2: 'Shubman Gill',    winner: 'Jasprit Bumrah',  mode: 'Tournament', duration: '19:58', score: '3-2', date: ago(60)  },
  { id: 'M-1035', player1: 'Ravindra Jadeja', player2: 'Hardik Pandya',   winner: 'Ravindra Jadeja', mode: 'Ranked',     duration: '12:21', score: '3-1', date: ago(72)  },
  { id: 'M-1034', player1: 'Shubman Gill',    player2: 'KL Rahul',        winner: 'KL Rahul',        mode: 'Casual',     duration: '07:44', score: '1-3', date: ago(88)  },
  { id: 'M-1033', player1: 'Hardik Pandya',   player2: 'Virat Kohli',     winner: 'Virat Kohli',     mode: 'Tournament', duration: '23:11', score: '2-3', date: ago(120) },
];
