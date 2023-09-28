import { Injectable, Inject } from '@nestjs/common'
import { DriverRepository } from 'src/database/repositories/driver.repository'
import { inyectionTokens } from 'src/database/repositories/inyections-tokens'
import { driverResponseDto } from './dto/driverResponse.dto'
import { mapDriverEntityToDto } from './mapper/driverMapper.entity'
import { ResponseDto } from 'src/common/response.dto'

@Injectable()
export class DriverService {
  constructor(
    @Inject(inyectionTokens.driverRepository)
    private readonly driverRepository: DriverRepository,
  ) {}

  async searchAllDrivers(): Promise<driverResponseDto[]> {
    const result = await this.driverRepository.findBySpecification({})

    if (result.length === 0) return []

    return result.map((x) => mapDriverEntityToDto(x))
  }

  async searchAvailableDrivers(): Promise<driverResponseDto[]> {
    const result = await this.driverRepository.findBySpecification({
      available: true,
    })

    if (result.length === 0) return []

    return result.map((x) => mapDriverEntityToDto(x))
  }

  async searchDriverById(id: number): Promise<ResponseDto<driverResponseDto>> {
    const driverNotFound = undefined
    const result = await this.driverRepository.findById(id)

    if (!result) return new ResponseDto(driverNotFound, 'Driver Not Found', 2)

    return new ResponseDto(mapDriverEntityToDto(result), 'Driver Found')
  }

  async searchNearByDrivers(
    latitud: string,
    longitud: string,
  ): Promise<driverResponseDto[]> {
    const nearRadioLocation = 3000
    const historyDriversNearBy = await this.driverRepository.searchNearLocation(
      latitud,
      longitud,
      nearRadioLocation,
    )

    const nearByDriversIds = historyDriversNearBy.map(
      (x) => x.driver_assignment_id,
    )

    const nearByDrivers =
      await this.driverRepository.findAllByIds(nearByDriversIds)

    if (nearByDrivers.length === 0) return []

    return nearByDrivers.map((x) => mapDriverEntityToDto(x))
  }
}
