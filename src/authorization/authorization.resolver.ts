
import { AuthorizationService } from './authorization.service';
import { User } from './entitys/user.entity';
import { UserArgs } from './dto/registrationUser.args';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
@Resolver()
export class AuthorizationResolver {
  constructor(private authorizationService: AuthorizationService) {};

  @Query(returns => String)
  async getHello(): Promise<string>{
    return "HELLO WORLD"
  }

  @Mutation(returns => User)
  async registration(@Args() args: UserArgs): Promise<User> {
    return this.authorizationService.registration(args);
  }
}
