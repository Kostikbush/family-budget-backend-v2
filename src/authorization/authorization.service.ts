import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entitys/user.schema';
import {User as UserType} from './types/User'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizationService {
  constructor(
  @InjectModel("User")
   private userModel: Model<User>,
   private jwtService: JwtService
  ) {}

  async registration(args: Omit<User, '_id' | 'id'>): Promise<User> {

        const { email, password } = args;
        const user = await this.userModel.findOne({ email });

        if (user) {
          throw new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({...args, password: hashedPassword});
        await createdUser.save();
        return createdUser;
  }
  async login() {

  }
  sanitizeUser(user: UserType) {
      const sanitized = user.toObject();
      delete sanitized['password'];
      return sanitized;
  }
}