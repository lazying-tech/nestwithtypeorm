import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSouceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { AccountsModule } from './accounts/accounts.module';
import { PermissionsModule } from './permissions/permissions.module';
import { EmployeesModule } from './employees/employees.module';
import { BillsModule } from './bills/bills.module';
import { BillsProductsModule } from './bills_products/bills_products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSouceOptions),
    UserModule,
    PostModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    AccountsModule,
    PermissionsModule,
    EmployeesModule,
    BillsModule,
    BillsProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
