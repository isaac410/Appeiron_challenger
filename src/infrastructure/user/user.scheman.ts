import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Role } from 'src/domain/user/role.enum';
import { UserStatus } from 'src/domain/user/user-status.enum';

@Schema({ collection: 'user', timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  lastname: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({ enum: UserStatus, default: UserStatus.INACTIVE })
  status: UserStatus;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;

  @Prop({ ref: User.name, required: true })
  createdBy: Types.ObjectId;

  @Prop({ ref: User.name, required: true })
  updatedBy: Types.ObjectId;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });
