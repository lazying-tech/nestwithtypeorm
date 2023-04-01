import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bill]), AccountsModule],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}
