import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Roles } from './consts/roles';
import { UserLoginInput, UserRegistrationInput } from './dto/registrationUser.args';
import { ReturnRegUser } from './entitys/user.entity';
import { User } from './entitys/user.schema';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registration(args: UserRegistrationInput): Promise<ReturnRegUser> {
    const { email, password } = args;

    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const createdUser = new this.userModel({
      ...args,
      password: hashedPassword,
      id: id,
      avatar: null,
      isSetComment: false,
      role: Roles.USER,
    });

    const token = this.jwtService.sign({ id: createdUser.id });
    await createdUser.save();

    return { user: createdUser, token: token };
  }

  async login(args: UserLoginInput): Promise<ReturnRegUser> {
    const { email, password } = args;

    const findUser = await this.userModel.findOne({ email });

    if (!findUser) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }

    const comparePassword = await bcrypt.compare(findUser.password, password);
    const sc = await bcrypt.compare('dWCASDC', findUser.password);
    console.log(comparePassword, sc);
    if (!comparePassword) {
      throw new HttpException('Пароль неверный', HttpStatus.BAD_REQUEST);
    }

    return { user: findUser, token: findUser.password };
  }
}
