import { Inject, Injectable } from '@nestjs/common'
import { inyectionTokens } from 'src/database/repositories/inyections-tokens'
import { TripRepository } from 'src/database/repositories/trip.repository'
import { tripResponseDto } from './dto/tripResponse.dto'
import { mapTripEntityToDto } from './mapper/tripMapper.entity'
import { tripRequestDto } from './dto/tripRequest.dto'
import { ResponseDto } from 'src/common/response.dto'
import { tripStatus } from 'src/common/constants/tripStatus.enum'

@Injectable()
export class TripService {
  constructor(
    @Inject(inyectionTokens.tripRepository)
    private readonly tripRepository: TripRepository,
  ) {}

  async searchInProgressTrip(): Promise<tripResponseDto[]> {
    const result = await this.tripRepository.findBySpecification(
      {
        state: tripStatus.IN_PROGRESS,
      },
      ['driver_assignment.controller', 'passenger'],
    )

    if (result.length === 0) return []

    return result.map((x) => mapTripEntityToDto(x))
  }

  async completeTrip(tripId: number): Promise<ResponseDto<number>> {
    const updatedRegisters = await this.tripRepository.update(tripId, {
      state: tripStatus.COMPLETE,
    })

    if (!updatedRegisters)
      return new ResponseDto(
        tripId,
        'Trip not found - no records was updated',
        2,
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
        2,
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
        2,
      )

    return new ResponseDto(request, 'Trip updated')
  }
}
