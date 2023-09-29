import { Injectable, Inject } from '@nestjs/common'
import { inyectionTokens } from '../../infrastructure/repositories/inyections-tokens'
import { PassengerRepository } from '../../infrastructure/repositories/passenger.repository'
import { passengerResponseDto } from './dto/passengerResponse.dto'
import { mapPassengerEntityToDto } from './mapper/passengerMapper.entity'
import { ResponseDto } from '../../common/response.dto'
import { responseStatusEnum } from '../../common/constants/responseStatus.enum'

@Injectable()
export class PassengerService {
  constructor(
    @Inject(inyectionTokens.passengerRepository)
    private readonly passengerRepository: PassengerRepository,
  ) {}

  async searchAllPassengers(): Promise<ResponseDto<passengerResponseDto[]>> {
    const result = await this.passengerRepository.findBySpecification({})

    if (result.length === 0)
      return new ResponseDto(
        [],
        'No passengers found',
        responseStatusEnum.Warning,
      )

    const passengers = result.map((entity) => mapPassengerEntityToDto(entity))
    return new ResponseDto(passengers, 'Passengers were Found')
  }

  async searchPassengerById(
    id: number,
  ): Promise<ResponseDto<passengerResponseDto>> {
    const driverNotFound = undefined
    const result = await this.passengerRepository.findById(id)

    if (!result)
      return new ResponseDto(
        driverNotFound,
        'Passenger Not Found',
        responseStatusEnum.Error,
      )

    return new ResponseDto(mapPassengerEntityToDto(result), 'Passenger Found')
  }
}
