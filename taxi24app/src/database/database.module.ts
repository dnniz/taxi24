import { Module } from '@nestjs/common'
import { Database } from './database'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  DriverEntity,
  DriverAssignmentEntity,
  LocationEntity,
  PassengerEntity,
  PilotTripEntity,
  TripEntity,
  VehicleUnitEntity,
} from './entities'

@Module({
  providers: [Database],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Dnnizxkkiero99',
      database: 'taxi24',
      entities: [
        DriverEntity,
        DriverAssignmentEntity,
        LocationEntity,
        PassengerEntity,
        PilotTripEntity,
        TripEntity,
        VehicleUnitEntity,
      ],
      synchronize: true,
      logging: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
