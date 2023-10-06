import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ErrorText } from 'src/authorization/consts/error-text';

@InputType()
export class UserRegistrationInput {
  @IsNotEmpty({ message: ErrorText.ERROR_NAME })
  @MinLength(3, { message: `${ErrorText.ERROR_NAME}3` })
  @Field({ nullable: false })
  readonly name: string;

  @MinLength(6, { message: `${ErrorText.ERROR_PASSWORD}6` })
  @Field({ nullable: false })
  readonly password: string;

  @IsNotEmpty({ message: ErrorText.ERROR_EMAIL })
  @IsEmail({}, { message: ErrorText.ERROR_EMAIL })
  @Field({ nullable: false })
  readonly email: string;
}

@InputType()
export class UserLoginInput {
  @MinLength(6, { message: `${ErrorText.ERROR_PASSWORD}6` })
  @Field({ nullable: false })
  readonly password: string;

  @IsNotEmpty({ message: ErrorText.ERROR_EMAIL })
  @IsEmail({}, { message: ErrorText.ERROR_EMAIL })
  @Field({ nullable: false })
  readonly email: string;
}
