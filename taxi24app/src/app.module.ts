import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DriverModule } from './driver/driver.module'
import { PassengerModule } from './passenger/passenger.module'
import { TripModule } from './trip/trip.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [DriverModule, PassengerModule, TripModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
