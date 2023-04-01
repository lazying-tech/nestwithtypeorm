import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSouceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';

import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { AccountsModule } from './accounts/accounts.module';

import { BillsModule } from './bills/bills.module';
import { BillsProductsModule } from './bills_products/bills_products.module';
import { PermissionsModule } from './permissions/permissions.module';

import { AuthModule } from './auth/auth.module';
import { UserAccountsModule } from './user-accounts/user-accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSouceOptions),
    UserModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    AuthModule,
    AccountsModule,
    PermissionsModule,
    BillsModule,
    BillsProductsModule,
    UserAccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
