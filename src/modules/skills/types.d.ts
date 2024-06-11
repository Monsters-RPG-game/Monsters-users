import type { ISkillsEntity } from './entity';
import type * as enums from '../../enums';
import type mongoose from 'mongoose';

export interface ISkills extends ISkillsEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface ISingleSkill extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  power: number;
  type: enums.ESkillsType;
}
