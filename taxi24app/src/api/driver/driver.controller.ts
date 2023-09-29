import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ResponseDto } from '../../common/response.dto'
import { driverResponseDto } from './dto/driverResponse.dto'
import { DriverService } from './driver.service'

@ApiTags('drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('/')
  @HttpCode(200)
  async allDrivers(): Promise<ResponseDto<driverResponseDto[]>> {
    return await this.driverService.searchAllDrivers()
  }

  @Get('/available')
  @HttpCode(200)
  async findAvailableDrivers(): Promise<ResponseDto<driverResponseDto[]>> {
    return await this.driverService.searchAvailableDrivers()
  }

  @Get('/:driverId')
  @HttpCode(200)
  async findDriverById(
    @Param('driverId') driverId: number,
  ): Promise<ResponseDto<driverResponseDto>> {
    return await this.driverService.searchDriverById(driverId)
  }

  @Get('/nearby/latitude/:lat/longitude/:long')
  @HttpCode(200)
  async findNearBy(
    @Param('lat') latitude: string,
    @Param('long') longitude: string,
    @Query('radiusInKms') radiusInKms: number,
  ): Promise<ResponseDto<driverResponseDto[]>> {
    return await this.driverService.searchNearByDrivers(
      latitude,
      longitude,
      radiusInKms,
    )
  }

  @Get('/closest/latitude/:lat/longitude/:long')
  @HttpCode(200)
  async closestNearBy(
    @Param('lat') latitude: string,
    @Param('long') longitude: string,
    @Query('limit') limit: number,
  ): Promise<ResponseDto<driverResponseDto[]>> {
    return await this.driverService.searchClosestDrivers(
      latitude,
      longitude,
      limit,
    )
  }
}
