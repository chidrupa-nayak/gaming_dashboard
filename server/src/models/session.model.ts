import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
  date:     { type: String, required: true },
  sessions: { type: Number, required: true },
}, { timestamps: true });

export const Session = model('Session', sessionSchema);
