import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ExpenseType, IncomType } from '../const/financeTypes';

@ObjectType()
class CurrentIncomeEntity {
  @Field({ nullable: false })
  @IsNotEmpty()
  id: string;

  @Field(() => IncomType, { nullable: false })
  type: IncomType;

  @Field({ nullable: false })
  count: number;

  @Field({ nullable: false })
  date: number;

  @Field({ nullable: false })
  category: string;

  @Field({ nullable: false })
  userID: string;
}

@ObjectType()
class CurrentExpenseEntity {
  @Field({ nullable: false })
  id: string;

  @Field(() => ExpenseType, { nullable: false })
  type: ExpenseType;

  @Field({ nullable: false })
  countOffs: number;

  @Field({ nullable: false })
  category: string;

  @Field({ nullable: false })
  dateOffs: string;

  @Field({ nullable: false })
  userID: string;
}

@ObjectType()
class AimEntity {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  type: ExpenseType;

  @Field({ nullable: false })
  sumOffs: number;

  @Field({ nullable: false })
  category: string;

  @Field({ nullable: false })
  accumulated: number;

  @Field({ nullable: false })
  dateOffs: string;

  @Field(() => Date, { nullable: false })
  dateEnd: Date;
}

@ObjectType()
class LastIncomEntity {
  @Field({ nullable: false })
  id: string;

  @Field(() => Date)
  date: Date;

  @Field()
  sum: number;

  @Field({ nullable: false })
  category: string;

  @Field({ nullable: false })
  userID: string;
}

@ObjectType()
class LastExpensesEntity {
  @Field({ nullable: false })
  id: string;

  @Field(() => Date)
  date: Date;

  @Field()
  sum: number;

  @Field({ nullable: false })
  category: string;

  @Field({ nullable: false })
  userID: string;
}

@ObjectType()
export class BudgetEntity {
  @Field(() => ID)
  id: string;

  @Field(() => [String], { nullable: false })
  users: string[];

  @Field({ nullable: false })
  sum: number;

  @Field(() => [CurrentIncomeEntity], { nullable: true, defaultValue: null })
  currentIncome: CurrentIncomeEntity[];

  @Field(() => [CurrentExpenseEntity], { nullable: true, defaultValue: null })
  currentExpens: CurrentExpenseEntity[];

  @Field(() => [LastIncomEntity], { defaultValue: [] })
  lastIncom: LastIncomEntity[];

  @Field(() => [LastExpensesEntity], { defaultValue: [] })
  lastExpenses: LastExpensesEntity[];

  @Field(() => [AimEntity], { defaultValue: [] })
  aim: AimEntity[];

  @Field(() => [String], { nullable: false, defaultValue: [] })
  categorys: string[];
}

@ObjectType()
export class ReturnBudget {
  @Field(() => BudgetEntity)
  budget: BudgetEntity;
}
