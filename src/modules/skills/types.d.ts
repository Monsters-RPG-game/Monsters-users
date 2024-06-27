import type { ISkillsEntity } from './entity';
import type mongoose from 'mongoose';

export interface ISkills extends ISkillsEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface ISingleSkill {
  skillId: string;
}

export interface ISingleSkillDetailed {
  _id: string;
  name: string;
  power: number;
  type: enums.ESkillsType;
  target: enums.ESkillTarget;
}

export interface ISkillsEntityDetailed {
  _id: string;
  owner: string;
  singleSkills: ISkillsEntityDetailed[];
}
