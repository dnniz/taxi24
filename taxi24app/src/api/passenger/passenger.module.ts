import { Module } from '@nestjs/common'
import { PassengerController } from './passenger.controller'
import { PassengerService } from './passenger.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassengerEntity } from '../../infrastructure/entities'
import { inyectionTokens } from '../../infrastructure/repositories/inyections-tokens'
import { PassengerRepository } from '../../infrastructure/repositories/passenger.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PassengerEntity])],
  controllers: [PassengerController],
  providers: [
    PassengerService,
    {
      provide: inyectionTokens.passengerRepository,
      useClass: PassengerRepository,
    },
  ],
})
export class PassengerModule {}
