import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ResponseDto } from 'src/common/response.dto'
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
}
