import { Inject, Injectable } from '@nestjs/common'
import { TripRepository } from '../../infrastructure/repositories/trip.repository'
import { tripResponseDto } from './dto/tripResponse.dto'
import { mapTripEntityToDto } from './mapper/tripMapper.entity'
import { tripRequestDto } from './dto/tripRequest.dto'
import { ResponseDto } from '../../common/response.dto'
import { tripStatus } from '../../common/constants/tripStatus.enum'
import { responseStatusEnum } from '../../common/constants/responseStatus.enum'
import { bookTripRequestDto } from './dto/bookTripRequest.dto'
import { PassengerRepository } from '../../infrastructure/repositories/passenger.repository'
import { DriverRepository } from '../../infrastructure/repositories/driver.repository'
import { inyectionTokens } from '../../infrastructure/repositories/inyections-tokens'

@Injectable()
export class TripService {
  constructor(
    @Inject(inyectionTokens.tripRepository)
    private readonly tripRepository: TripRepository,
    @Inject(inyectionTokens.driverRepository)
    private readonly driverRepository: DriverRepository,
    @Inject(inyectionTokens.passengerRepository)
    private readonly passengerRepository: PassengerRepository,
  ) {}

  async searchInProgressTrip(): Promise<ResponseDto<tripResponseDto[]>> {
    const result = await this.tripRepository.findBySpecification(
      {
        state: tripStatus.IN_PROGRESS,
      },
      ['driver_assignment.driver', 'passenger'],
    )

    if (result.length === 0)
      return new ResponseDto(
        [],
        'No trips in progress found',
        responseStatusEnum.Warning,
      )

    const trips = result.map((entity) => mapTripEntityToDto(entity))

    return new ResponseDto(trips, 'Trips in progress were found')
  }

  async completeTrip(tripId: number): Promise<ResponseDto<number>> {
    const updatedRegisters = await this.tripRepository.update(tripId, {
      state: tripStatus.COMPLETE,
    })

    if (!updatedRegisters)
      return new ResponseDto(
        tripId,
        'Trip not found - no records was updated',
        responseStatusEnum.Warning,
      )

    return new ResponseDto(tripId, 'Trip completed!')
  }

  async inProgressTrip(tripId: number): Promise<ResponseDto<number>> {
    const updatedRegisters = await this.tripRepository.update(tripId, {
      state: tripStatus.IN_PROGRESS,
    })

    if (!updatedRegisters)
      return new ResponseDto(
        tripId,
        'Trip not found - no records was updated',
        responseStatusEnum.Warning,
      )

    return new ResponseDto(tripId, 'Trip in progress!')
  }

  async updateStateTrip(
    request: tripRequestDto,
  ): Promise<ResponseDto<tripRequestDto>> {
    const { tripId, state } = request
    const updatedRegisters = await this.tripRepository.update(tripId, { state })

    if (!updatedRegisters)
      return new ResponseDto(
        request,
        'Trip not found - Any register was updated',
        responseStatusEnum.Warning,
      )

    return new ResponseDto(request, 'Trip updated')
  }

  async bookTrip(
    request: bookTripRequestDto,
  ): Promise<ResponseDto<tripRequestDto>> {
    const { driverId, passengerId } = request

    const driver = await this.driverRepository.findById(driverId)
    const passenger = await this.passengerRepository.findById(passengerId)

    const trip = await this.tripRepository.create({
      driver_assignment: driver,
      passenger: passenger,
      state: tripStatus.PENDING,
      start_datetime_trip: new Date(),
    })

    return new ResponseDto(mapTripEntityToDto(trip), 'requested Trip!')
  }
}
