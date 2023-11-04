import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetResolver } from './budget.resolver';
import { BudgetService } from './budget.service';
import { BudgetSchema } from './entitys/budget.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Budget', schema: BudgetSchema }])],
  exports: [BudgetService],
  providers: [BudgetService, BudgetResolver],
})
export class BudgetModule {}
