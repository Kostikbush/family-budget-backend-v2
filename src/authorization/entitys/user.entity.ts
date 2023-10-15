import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { Roles } from 'src/authorization/consts/roles';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  id: string;

  @Field({ nullable: false })
  @MinLength(3, { message: 'Имя должно быть более 2 букв' })
  name: string;

  @Field(() => [Roles], { nullable: false })
  @MinLength(1)
  role: Roles[];

  @Field({ nullable: false })
  @IsEmail({}, { message: 'Введите правилную почту' })
  @MinLength(4)
  email: string;

  @Field()
  @MinLength(6, { message: 'Пароль должен быть больше 5 символов' })
  password: string;

  @Field({ defaultValue: null, nullable: true })
  avatar: string;

  @Field(() => Boolean, { defaultValue: false, nullable: false })
  @IsNotEmpty()
  isSetComment: boolean;

  @Field({ nullable: false })
  dateCreate: string;
}

@ObjectType()
export class ReturnRegUser {
  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  token: string;
}
