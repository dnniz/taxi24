import { Controller, Get, HttpCode, Post, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TripService } from './trip.service'
import { tripResponseDto } from './dto/tripResponse.dto'
import { ResponseDto } from 'src/common/response.dto'

@ApiTags('trips')
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('/active')
  @HttpCode(200)
  async activeTrips(): Promise<ResponseDto<tripResponseDto[]>> {
    const trips = await this.tripService.searchInProgressTrip()

    if (trips.length === 0)
      return new ResponseDto(trips, 'No se encontraron viajes activos')

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
}
