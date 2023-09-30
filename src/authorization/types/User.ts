import { Roles } from "../consts/roles";
import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  password: string;
  email: string;
  id: string;
  _id: string;
  role: Roles[];
  isActivated: boolean;
  activationLink: string | null;
  avatar: string | null;
  isSetComment: boolean;
}