import { Account } from 'src/accounts/entities/account.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { BillProducts } from 'src/bills_products/entities/bills_product.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSouceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'banhangorm',
  entities: [
    User,
    Product,
    Account,
    Bill,
    Brand,
    Category,
    Employee,
    Permission,
    BillProducts,
  ],
  migrations: ['dist/db/migrations/*.js'],
  // synchronize: true,
};

const dataSource = new DataSource(dataSouceOptions);
export default dataSource;
