import { Args, Query, Resolver } from '@nestjs/graphql';
import { BudgetService } from '../budget/budget.service';
import { BudgetCreateInput } from './dto/Budget.args';
import { ReturnBudget } from './entitys/budget.entity';

@Resolver()
export class BudgetResolver {
  constructor(private budgetServiceService: BudgetService) {}

  @Query(() => ReturnBudget, { name: 'getBudget' })
  async getBudget(@Args('args') args: BudgetCreateInput): Promise<ReturnBudget> {
    return await this.budgetServiceService.getBudget(args);
  }
}
