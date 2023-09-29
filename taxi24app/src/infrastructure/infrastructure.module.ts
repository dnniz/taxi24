import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  DriverEntity,
  DriverAssignmentEntity,
  LocationEntity,
  PassengerEntity,
  PilotTripEntity,
  TripEntity,
  VehicleUnitEntity,
  HistoryDriverLocationEntity,
} from './entities'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: '',
      entities: [
        DriverEntity,
        DriverAssignmentEntity,
        LocationEntity,
        PassengerEntity,
        PilotTripEntity,
        TripEntity,
        VehicleUnitEntity,
        HistoryDriverLocationEntity,
      ],
      synchronize: true,
      logging: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class InfrastructureModule {}
