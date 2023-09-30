import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { Roles } from '../consts/roles';

export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true })
  id: string;

  @Prop()
  _id: string;

  @Prop({ type: [String], enum: Object.values(Roles), required: true })
  role: Roles[];

  @Prop({ required: true, default: false })
  isActivated: boolean;

  @Prop()
  activationLink: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ required: true, default: false })
  isSetComment: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
