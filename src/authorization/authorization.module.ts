import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { BudgetModule } from '../budget/budget.module';
import { AuthorizationResolver } from './authorization.resolver';
import { AuthorizationService } from './authorization.service';
import { UserSchema } from './entitys/user.schema';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    BudgetModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthorizationResolver, AuthorizationService, JwtStrategy],
})
export class AuthorizationModule {}
