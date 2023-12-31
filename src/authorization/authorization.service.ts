import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { BudgetService } from 'src/budget/budget.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles } from './consts/roles';
import { UserGetInput, UserLoginInput, UserRegistrationInput } from './dto/registrationUser.args';
import { ReturnRegUser } from './entitys/user.entity';
import { User } from './entitys/user.schema';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private budgetService: BudgetService,
  ) {}

  async getUser(args: UserGetInput): Promise<ReturnRegUser> {
    const { id } = args;

    const findUser = await this.userModel.findOne({ id });

    if (!findUser) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    const budget = await this.budgetService.getBudget({ id });

    return { budget: budget.budget, user: findUser };
  }

  async registration(args: UserRegistrationInput): Promise<ReturnRegUser> {
    const { email, password } = args;

    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    const date = new Date();
    const dateStr = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    const createdUser = new this.userModel({
      ...args,
      password: hashedPassword,
      id: id,
      avatar: null,
      isSetComment: false,
      role: Roles.USER,
      dateCreate: dateStr,
    });
    const budget = await this.budgetService.createBudget({ id });
    await createdUser.save();
    return { budget: budget.budget, user: createdUser };
  }

  async login(args: UserLoginInput): Promise<ReturnRegUser> {
    const { email, password } = args;

    const findUser = await this.userModel.findOne({ email });

    if (!findUser) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) {
      throw new HttpException('Пароль неверный', HttpStatus.BAD_REQUEST);
    }
    const budget = await this.budgetService.getBudget({ id: findUser.id });
    return { budget: budget.budget, user: findUser };
  }
}
