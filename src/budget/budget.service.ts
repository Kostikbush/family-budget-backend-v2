import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { BudgetCreateInput } from './dto/budget.args';
import { ReturnBudget } from './entitys/budget.entity';
import { Budget } from './entitys/budget.schema';

@Injectable()
export class BudgetService {
  constructor(@InjectModel('Budget') private budgetModel: Model<Budget>) {}

  async createBudget(args: BudgetCreateInput): Promise<ReturnBudget> {
    const { id: userID } = args;
    const id = uuidv4();
    const budget = new this.budgetModel({
      users: [userID],
      id: id,
      sum: 0,
      aim: [],
      categoryses: [],
      currentExpens: [],
      currentIncome: [],
      lastExpenses: [],
      lastIncom: [],
      categorys: [],
    });

    await budget.save();

    return { budget: budget };
  }

  async getBudget(args: BudgetCreateInput): Promise<ReturnBudget> {
    const budget = await this.budgetModel.findOne({ users: args.id });

    if (!budget) {
      throw new HttpException('Бюджет не найден', HttpStatus.BAD_REQUEST);
    }
    return { budget };
  }
}
