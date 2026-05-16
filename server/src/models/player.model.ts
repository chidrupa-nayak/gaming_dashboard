import { Schema, model } from 'mongoose';

const playerSchema = new Schema({
  rank:    { type: Number, required: true },
  name:    { type: String, required: true },
  score:   { type: Number, required: true },
  wins:    { type: Number, required: true },
  losses:  { type: Number, required: true },
  winRate: { type: Number, required: true },
  avatar:  { type: String, required: true },
}, { timestamps: true });

export const Player = model('Player', playerSchema);
