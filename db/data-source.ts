import { User } from "src/user/entities/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSouceOptions:DataSourceOptions={
    type:'mysql',
    host:"localhost",
    port:3306,
    username:'root',
    password:'',
    database:'test',
    entities:[User],
    migrations:['dist/db/migrations/*.js']
}

const dataSource=new DataSource(dataSouceOptions);
export default dataSource