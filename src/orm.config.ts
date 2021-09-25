import {TypeOrmModuleOptions} from '@nestjs/typeorm'
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'doadmin',
  password: '3o_42Z7FQBI0om2D',
  port: 25060,
  host: 'location-do-user-9882211-0.b.db.ondigitalocean.com',
  database: 'location',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};