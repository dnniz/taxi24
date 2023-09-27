import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ResponseDto } from 'src/common/response.dto'
import { driverResponseDto } from './dto/driverResponse.dto'
import { DriverService } from './driver.service'

@ApiTags('drivers')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('/')
  @HttpCode(200)
  async findAvaliableDrivers(): Promise<ResponseDto<driverResponseDto[]>> {
    const drivers = await this.driverService.searchAvailableDrivers()

    return new ResponseDto(drivers, 'Drivers disponibles obtenidos con éxito')
  }

  @Get('/:driverId')
  @HttpCode(200)
  async findDriverById(
    @Param('driverId') driverId: number,
  ): Promise<ResponseDto<driverResponseDto>> {
    return await this.driverService.searchDriverById(driverId)
  }
}
