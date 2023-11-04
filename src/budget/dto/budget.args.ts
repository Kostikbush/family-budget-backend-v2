import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ErrorText } from '../const/ErrorText';

@InputType()
export class BudgetCreateInput {
  @IsNotEmpty({ message: ErrorText.userID })
  @MinLength(10, { message: `${ErrorText.userID}` })
  @Field({ nullable: false })
  readonly id: string;
}

// @InputType()
// export class UserLoginInput {
//   @MinLength(6, { message: `${ErrorText.ERROR_PASSWORD}` })
//   @Field({ nullable: false })
//   readonly password: string;

//   @IsNotEmpty({ message: ErrorText.ERROR_EMAIL })
//   @IsEmail({}, { message: ErrorText.ERROR_EMAIL })
//   @Field({ nullable: false })
//   readonly email: string;
// }

// @InputType()
// export class UserGetInput {
//   @IsNotEmpty({ message: ErrorText.ERROR_EMAIL })
//   @IsEmail({}, { message: ErrorText.ERROR_EMAIL })
//   @Field({ nullable: false })
//   readonly email: string;
// }
