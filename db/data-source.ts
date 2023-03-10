import { Post } from 'src/post/entities/post.entity';
import { Profile } from 'src/user/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSouceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test',
  entities: [User, Profile, Post],
  migrations: ['dist/db/migrations/*.js'],
  // synchronize: true,
};

const dataSource = new DataSource(dataSouceOptions);
export default dataSource;
