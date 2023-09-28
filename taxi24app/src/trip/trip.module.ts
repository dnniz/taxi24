import { Module } from '@nestjs/common'
import { TripController } from './trip.controller'
import { TripService } from './trip.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  DriverAssignmentEntity,
  PassengerEntity,
  TripEntity,
} from 'src/database/entities'
import { inyectionTokens } from 'src/database/repositories/inyections-tokens'
import { TripRepository } from 'src/database/repositories/trip.repository'
import { DriverRepository } from 'src/database/repositories/driver.repository'
import { PassengerRepository } from 'src/database/repositories/passenger.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TripEntity,
      PassengerEntity,
      DriverAssignmentEntity,
    ]),
  ],
  controllers: [TripController],
  providers: [
    TripService,
    {
      provide: inyectionTokens.tripRepository,
      useClass: TripRepository,
    },
    {
      provide: inyectionTokens.driverRepository,
      useClass: DriverRepository,
    },
    {
      provide: inyectionTokens.passengerRepository,
      useClass: PassengerRepository,
    },
  ],
})
export class TripModule {}
