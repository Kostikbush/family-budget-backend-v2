import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from '../consts/roles';

export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

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

  @Prop({ type: [String], enum: Object.values(Roles), required: true })
  role: Roles[];

  @Prop({ default: null })
  avatar: string;

  @Prop({ required: true, default: false })
  isSetComment: boolean;

  @Prop({required: true})
  dateCreate: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', async function (next: HookNextFunction) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }
//     const hashed = await bcrypt.hash(this['password'], 10);
//     this['password'] = hashed;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });
