import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Roles } from 'src/authorization/consts/roles';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Roles])
  role: Roles[];

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  _id: string;

  @Field(() => Boolean)
  isActivated: boolean;

  @Field()
  activationLink: string;

  @Field()
  avatar: string;

  @Field(() => Boolean)
  isSetComment: boolean;
}
