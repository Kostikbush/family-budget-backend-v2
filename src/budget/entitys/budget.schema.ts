import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ExpenseType, IncomType } from '../const/financeTypes';

@Schema()
class CurrentIncome {
  @Prop({ required: true })
  id: string;

  @Prop({ type: String, enum: Object.values(IncomType), required: true })
  type: IncomType;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  date: number;

  @Prop({ required: true })
  category: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, required: true })
  userID: string;
}

@Schema()
class CurrentExpense {
  @Prop({ required: true })
  id: string;

  @Prop({ type: String, enum: Object.values(ExpenseType), required: true })
  type: ExpenseType;

  @Prop({ required: true })
  countOffs: number;

  @Prop({ required: true })
  category: string;

  @Prop({ type: String, required: true })
  dateOffs: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, required: true })
  userID: string;
}

@Schema()
class Aim {
  @Prop({ required: true })
  id: string;

  @Prop({ type: String, enum: Object.values(ExpenseType), required: true })
  type: ExpenseType;

  @Prop({ required: true })
  sumOffs: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  accumulated: number;

  @Prop({ type: String, required: true })
  dateOffs: string;

  @Prop({ required: true, type: Date })
  dateEnd: Date;
}

@Schema()
class LastIncom {
  @Prop({ required: true })
  id: string;

  @Prop({ type: Date })
  date: Date;

  @Prop()
  sum: number;

  @Prop({ required: true })
  category: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, required: true })
  userID: string;
}

@Schema()
class LastExpenses {
  @Prop({ required: true })
  id: string;

  @Prop({ type: Date })
  date: Date;

  @Prop()
  sum: number;

  @Prop({ required: true })
  category: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, required: true })
  userID: string;
}

@Schema()
export class Budget {
  @Prop({ required: true })
  id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], required: true })
  users: string[];

  @Prop({ required: true })
  sum: number;

  @Prop({ type: [CurrentIncome] })
  currentIncome: CurrentIncome[];

  @Prop({ type: [CurrentExpense] })
  currentExpens: CurrentExpense[];

  @Prop({ type: [LastIncom] })
  lastIncom: LastIncom[];

  @Prop({ type: [LastExpenses] })
  lastExpenses: LastExpenses[];

  @Prop({ type: [Aim] })
  aim: Aim[];

  @Prop({ required: true, type: [String] })
  categorys: string[];
}

export const BudgetSchema = new mongoose.Schema({
  id: { type: String, required: true },
  users: { type: [String], required: true },
  sum: { type: Number, required: true },
  currentIncome: [
    {
      id: { type: String, required: true },
      type: { type: String, enum: Object.values(IncomType), required: true },
      count: { type: Number, required: true },
      date: { type: Number || String, required: true },
      category: { required: true, type: String },
      userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
  ],
  currentExpens: [
    {
      id: { type: String, required: true },
      type: { type: String, enum: Object.values(ExpenseType), required: true },
      countOffs: { type: Number, required: true },
      category: { required: true, type: String },
      userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      dateOffs: { type: String || Number, required: true },
    },
  ],
  lastIncom: [
    {
      id: { type: String, required: true },
      date: { type: Date, required: true },
      sum: { type: Number, required: true },
      category: { type: String, required: true },
      userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
  ],
  lastExpenses: [
    {
      id: { type: String, required: true },
      date: { type: Date, required: true },
      sum: { type: Number, required: true },
      category: { type: String, required: true },
      userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
  ],
  aim: [
    {
      id: { type: String, required: true },
      type: { type: String, enum: Object.values(ExpenseType), required: true },
      countOffs: { type: Number, required: true },
      category: { required: true, type: String },
      accumulated: { type: Number, required: true },
      dateOffs: { type: String, required: true },
      dateEnd: { type: Date, required: true },
    },
  ],
});

// export const BudgetSchema = SchemaFactory.createForClass(Budget);
