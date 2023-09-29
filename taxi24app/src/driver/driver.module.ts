import { Module } from '@nestjs/common'
import { DriverController } from './driver.controller'
import { DriverService } from './driver.service'
import { inyectionTokens } from '../infrastructure/repositories/inyections-tokens'
import { DriverRepository } from '../infrastructure/repositories/driver.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DriverAssignmentEntity } from '../infrastructure/entities'

@Module({
  imports: [TypeOrmModule.forFeature([DriverAssignmentEntity])],
  controllers: [DriverController],
  providers: [
    DriverService,
    {
      provide: inyectionTokens.driverRepository,
      useClass: DriverRepository,
    },
  ],
})
export class DriverModule {}
