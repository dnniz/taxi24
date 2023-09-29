import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DriverModule } from './api/driver/driver.module'
import { PassengerModule } from './api/passenger/passenger.module'
import { TripModule } from './api/trip/trip.module'
import { InfrastructureModule } from './infrastructure/infrastructure.module'

@Module({
  imports: [DriverModule, PassengerModule, TripModule, InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
