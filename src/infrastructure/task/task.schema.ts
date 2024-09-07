import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Project } from '../project/project.scheman';
import { TaskStatus } from 'src/domain/task/task-status.enum';
import { User } from '../user/user.scheman';

@Schema({ collection: 'task', timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: User.name }])
  members: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  project: Types.ObjectId;

  @Prop({ enum: TaskStatus, default: TaskStatus.NOT_STARTED })
  status: TaskStatus;

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

export type TaskDocument = HydratedDocument<Task>;
export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.index({ title: 1, project: 1 }, { unique: true });
