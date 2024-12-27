import type { IProfileEntity } from './entity.js';
import type mongoose from 'mongoose';

export interface IProfile extends IProfileEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
