import { Module } from '@nestjs/common'
import { TripController } from './trip.controller'
import { TripService } from './trip.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TripEntity } from 'src/database/entities'
import { inyectionTokens } from 'src/database/repositories/inyections-tokens'
import { TripRepository } from 'src/database/repositories/trip.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity])],
  controllers: [TripController],
  providers: [
    TripService,
    {
      provide: inyectionTokens.tripRepository,
      useClass: TripRepository,
    },
  ],
})
export class TripModule {}
