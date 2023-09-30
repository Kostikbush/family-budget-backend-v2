import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { Roles } from '../consts/roles';

@ArgsType()
export class UserArgs {
  @Field({ nullable: false })
  @MinLength(3)
  name: string;

  @Field({ nullable: false })
  @MinLength(6)
  password: string;

  @Field({ nullable: false })
  @IsEmail()
  @MinLength(4)
  email: string;

  @Field({ nullable: false })
  @Field(() => [Roles])
  @MinLength(1)
  role: Roles[];

  @Field({ nullable: false })
  @Field(() => Boolean)
  isActivated: boolean;

  @Field({ nullable: true })
  activationLink: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: false })
  @Field(() => Boolean)
  isSetComment: boolean;
}
