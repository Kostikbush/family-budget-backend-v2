import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  ADMIN = 'ADMIN',
  VIP_USER = 'VIP_USER',
  USER = 'USER',
}

registerEnumType(Roles, {
  name: 'Roles',
});
