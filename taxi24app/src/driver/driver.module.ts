import { Module } from '@nestjs/common'
import { DriverController } from './driver.controller'
import { DriverService } from './driver.service'
import { inyectionTokens } from 'src/database/repositories/inyections-tokens'
import { DriverRepository } from 'src/database/repositories/driver.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DriverAssignmentEntity } from 'src/database/entities'

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
