import { Module } from '@nestjs/common';
import { AccountsController } from 'src/accounts/accounts.controller';
import { AccountsModule } from 'src/accounts/accounts.module';
import { UserModule } from 'src/user/user.module';
import { UserAccountsController } from './user-accounts.controller';
import { UserAccountsService } from './user-accounts.service';

@Module({
  imports: [AccountsModule, UserModule],
  controllers: [UserAccountsController],
  providers: [UserAccountsService],
})
export class UserAccountsModule {}
