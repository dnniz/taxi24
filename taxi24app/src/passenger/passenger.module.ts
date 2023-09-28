import { Module } from '@nestjs/common'
import { PassengerController } from './passenger.controller'
import { PassengerService } from './passenger.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassengerEntity } from 'src/database/entities'
import { inyectionTokens } from 'src/database/repositories/inyections-tokens'
import { PassengerRepository } from 'src/database/repositories/passenger.repository'

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
