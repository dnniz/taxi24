import { Module } from '@nestjs/common';
import { Database } from './database';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ControllerEntity,
  DriverAssignmentEntity,
  LocationEntity,
  PassengerEntity,
  PilotTripEntity,
  TripEntity,
  VehicleUnitEntity,
} from './entities'; // Importa otras entidades si las tienes

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
        ControllerEntity,
        DriverAssignmentEntity,
        LocationEntity,
        PassengerEntity,
        PilotTripEntity,
        TripEntity,
        VehicleUnitEntity,
      ],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
