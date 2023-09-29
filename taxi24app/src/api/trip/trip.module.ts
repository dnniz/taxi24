import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  DriverAssignmentEntity,
  PassengerEntity,
  TripEntity,
} from '../../infrastructure/entities'
import { inyectionTokens } from '../../infrastructure/repositories/inyections-tokens'
import { TripRepository } from '../../infrastructure/repositories/trip.repository'
import { DriverRepository } from '../../infrastructure/repositories/driver.repository'
import { PassengerRepository } from '../../infrastructure/repositories/passenger.repository'
import { TripController } from './trip.controller'
import { TripService } from './trip.service'

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
