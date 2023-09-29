import { Controller, Get, HttpCode, Post, Param, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { tripResponseDto } from './dto/tripResponse.dto'
import { ResponseDto } from '../../common/response.dto'
import { bookTripRequestDto } from './dto/bookTripRequest.dto'
import { tripRequestDto } from './dto/tripRequest.dto'
import { TripService } from './trip.service'

@ApiTags('trips')
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('/inProgress')
  @HttpCode(200)
  async activeTrips(): Promise<ResponseDto<tripResponseDto[]>> {
    return await this.tripService.searchInProgressTrip()
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
