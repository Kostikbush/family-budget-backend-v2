import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationService } from './authorization.service';
import { UserArgs } from './dto/registrationUser.args';
import { User } from './entitys/user.entity';

@Resolver()
export class AuthorizationResolver {
  constructor(private authorizationService: AuthorizationService) {}

  @Query(() => String)
  async getHello(): Promise<string> {
    return 'HELLO WORLD';
  }

  @Mutation(() => User)
  async registration(@Args() args: UserArgs): Promise<User> {
    return this.authorizationService.registration(args);
  }
}
