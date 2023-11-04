import { registerEnumType } from '@nestjs/graphql';

export enum IncomType {
  week = 'week',
  mounth = 'mounth',
}

export enum ExpenseType {
  IncomType,
  year = 'year',
  day = 'day',
}

registerEnumType(ExpenseType, {
  name: 'ExpenseType',
});

registerEnumType(IncomType, {
  name: 'IncomType',
});
