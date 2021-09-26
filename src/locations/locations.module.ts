import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), ConfigModule],
  controllers: [LocationsController],
  providers: [
    {
      provide: 'LOCATION_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'location',
            protoPath: join(process.cwd(), './src/location.proto'),
            url: configService.get('GRPC_CONNECTION_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class LocationsModule {}
