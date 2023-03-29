import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountsModule } from 'src/accounts/accounts.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [
    AccountsModule,
    PassportModule,
    JwtModule.register({
      secret: 'SecretKEYYEY',
      signOptions: { expiresIn: '1d' },
    }),
    PermissionsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
