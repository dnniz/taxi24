import { Injectable, Inject } from '@nestjs/common'
import { inyectionTokens } from 'src/database/repositories/inyections-tokens'
import { PassengerRepository } from 'src/database/repositories/passenger.repository'
import { passengerResponseDto } from './dto/passengerResponse.dto'
import { mapPassengerEntityToDto } from './mapper/passengerMapper.entity'
import { ResponseDto } from 'src/common/response.dto'
import { responseStatusEnum } from 'src/common/constants/responseStatus.enum'

@Injectable()
export class PassengerService {
  constructor(
    @Inject(inyectionTokens.passengerRepository)
    private readonly passengerRepository: PassengerRepository,
  ) {}

  async searchAllPassengers(): Promise<passengerResponseDto[]> {
    const result = await this.passengerRepository.findBySpecification({})

    if (result.length === 0) return []

    return result.map((x) => mapPassengerEntityToDto(x))
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
