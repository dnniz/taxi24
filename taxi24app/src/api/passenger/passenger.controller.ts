import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { passengerResponseDto } from './dto/passengerResponse.dto'
import { PassengerService } from './passenger.service'
import { ResponseDto } from '../../common/response.dto'

@ApiTags('passengers')
@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get('/')
  @HttpCode(200)
  async allPassengers(): Promise<ResponseDto<passengerResponseDto[]>> {
    return await this.passengerService.searchAllPassengers()
  }

  @Get('/:passengerId')
  @HttpCode(200)
  async findPassengerById(
    @Param('passengerId') driverId: number,
  ): Promise<ResponseDto<passengerResponseDto>> {
    return await this.passengerService.searchPassengerById(driverId)
  }
}
