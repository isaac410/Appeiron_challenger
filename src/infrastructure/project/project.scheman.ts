import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '../user/user.scheman';
import { ProjectStatus } from 'src/domain/project/project-status.enum';

@Schema({ collection: 'project', timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: User.name }])
  members: Types.ObjectId[];

  @Prop({ enum: ProjectStatus, default: ProjectStatus.NOT_STARTED })
  status: ProjectStatus;

  @Prop()
  dueDate: Date;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;

  @Prop({ ref: User.name, required: true })
  createdBy: Types.ObjectId;

  @Prop({ ref: User.name, required: true })
  updatedBy: Types.ObjectId;
}

export type ProjectDocument = HydratedDocument<Project>;
export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.index({ title: 1 }, { unique: true });
