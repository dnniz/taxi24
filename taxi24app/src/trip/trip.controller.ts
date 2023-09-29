import { Controller, Get, HttpCode, Post, Param, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TripService } from './trip.service'
import { tripResponseDto } from './dto/tripResponse.dto'
import { ResponseDto } from '../common/response.dto'
import { responseStatusEnum } from 'src/common/constants/responseStatus.enum'
import { bookTripRequestDto } from './dto/bookTripRequest.dto'
import { tripRequestDto } from './dto/tripRequest.dto'

@ApiTags('trips')
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('/inProgress')
  @HttpCode(200)
  async activeTrips(): Promise<ResponseDto<tripResponseDto[]>> {
    const trips = await this.tripService.searchInProgressTrip()

    if (trips.length === 0)
      return new ResponseDto(
        trips,
        'No se encontraron viajes activos',
        responseStatusEnum.Error,
      )

    return new ResponseDto(trips, 'Viajes activos obtenidos con éxito')
  }

  @Post('/:tripId/complete')
  @HttpCode(200)
  async setCompleteTrip(
    @Param('tripId') tripId: number,
  ): Promise<ResponseDto<number>> {
    return await this.tripService.completeTrip(tripId)
  }

  @Post('/:tripId/inProgress')
  @HttpCode(200)
  async setInProgressTrip(
    @Param('tripId') tripId: number,
  ): Promise<ResponseDto<number>> {
    return await this.tripService.inProgressTrip(tripId)
  }

  @Post('/trip/solicitude')
  @HttpCode(200)
  async solicitudeTrip(
    @Body() solicitude: bookTripRequestDto,
  ): Promise<ResponseDto<tripRequestDto>> {
    return await this.tripService.bookTrip(solicitude)
  }
}
