import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationService } from './authorization.service';
import { UserGetInput, UserLoginInput, UserRegistrationInput } from './dto/registrationUser.args';
import { ReturnRegUser } from './entitys/user.entity';

@Resolver()
export class AuthorizationResolver {
  constructor(private authorizationService: AuthorizationService) {}

  @Mutation(() => ReturnRegUser, { name: 'registration' })
  async registration(@Args('args') args: UserRegistrationInput): Promise<ReturnRegUser> {
    return this.authorizationService.registration(args);
  }

  @Mutation(() => ReturnRegUser, { name: 'login' })
  async login(@Args('args') args: UserLoginInput): Promise<ReturnRegUser> {
    return this.authorizationService.login(args);
  }

  @Query(() => ReturnRegUser, { name: 'getUser' })
  async getUser(@Args('args') args: UserGetInput): Promise<ReturnRegUser> {
    return this.authorizationService.getUser(args);
  }
}
