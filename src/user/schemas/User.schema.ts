import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  accessToken: String,
  from: {
    type: String,
    enum: ['google', 'facebook'],
    default: 'google',
  },
});
