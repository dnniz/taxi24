import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ResponseDto } from '../common/response.dto'
import { driverResponseDto } from './dto/driverResponse.dto'
import { DriverService } from './driver.service'

@ApiTags('drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('/')
  @HttpCode(200)
  async allDrivers(): Promise<ResponseDto<driverResponseDto[]>> {
    const drivers = await this.driverService.searchAllDrivers()

    return new ResponseDto(drivers, 'Listado de todos los Conductores')
  }

  @Get('/available')
  @HttpCode(200)
  async findAvailableDrivers(): Promise<ResponseDto<driverResponseDto[]>> {
    const drivers = await this.driverService.searchAvailableDrivers()

    return new ResponseDto(
      drivers,
      'Conductores disponibles obtenidos con éxito',
    )
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
    const drivers = await this.driverService.searchNearByDrivers(
      latitude,
      longitude,
      radiusInKms,
    )
    return new ResponseDto(drivers, 'Drivers nearby by radius kilometers')
  }

  @Get('/closest/latitude/:lat/longitude/:long')
  @HttpCode(200)
  async closestNearBy(
    @Param('lat') latitude: string,
    @Param('long') longitude: string,
    @Query('limit') limit: number,
  ): Promise<ResponseDto<driverResponseDto[]>> {
    const drivers = await this.driverService.searchClosestDrivers(
      latitude,
      longitude,
      limit,
    )
    return new ResponseDto(drivers, 'Drivers closest by limit closest')
  }
}
