import { Schema, model } from 'mongoose';

const matchSchema = new Schema({
  id:       { type: String, required: true, unique: true },
  player1:  { type: String, required: true },
  player2:  { type: String, required: true },
  winner:   { type: String, required: true },
  mode:     { type: String, enum: ['Ranked', 'Casual', 'Tournament'], required: true },
  duration: { type: String, required: true },
  score:    { type: String, required: true },
  date:     { type: String, required: true },
}, { timestamps: true });

export const Match = model('Match', matchSchema);
