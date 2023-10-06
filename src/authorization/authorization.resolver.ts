import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationService } from './authorization.service';
import { UserLoginInput, UserRegistrationInput } from './dto/registrationUser.args';
import { ReturnRegUser } from './entitys/user.entity';

@Resolver()
export class AuthorizationResolver {
  constructor(private authorizationService: AuthorizationService) {}

  @Query(() => String, { name: 'init' })
  async getHello(): Promise<string> {
    return 'HELLO WORLD';
  }

  @Mutation(() => ReturnRegUser, { name: 'registration' })
  async registration(@Args('args') args: UserRegistrationInput): Promise<ReturnRegUser> {
    return this.authorizationService.registration(args);
  }

  @Mutation(() => ReturnRegUser, { name: 'login' })
  async login(@Args('args') args: UserLoginInput): Promise<ReturnRegUser> {
    return this.authorizationService.login(args);
  }
}
