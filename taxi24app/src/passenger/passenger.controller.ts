import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PassengerService } from './passenger.service'
import { ResponseDto } from '../common/response.dto'
import { passengerResponseDto } from './dto/passengerResponse.dto'

@ApiTags('passengers')
@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get('/')
  @HttpCode(200)
  async allPassengers(): Promise<ResponseDto<passengerResponseDto[]>> {
    const drivers = await this.passengerService.searchAllPassengers()

    return new ResponseDto(drivers, 'Listado de todos los Pasajeros')
  }

  @Get('/:passengerId')
  @HttpCode(200)
  async findPassengerById(
    @Param('passengerId') driverId: number,
  ): Promise<ResponseDto<passengerResponseDto>> {
    return await this.passengerService.searchPassengerById(driverId)
  }
}
