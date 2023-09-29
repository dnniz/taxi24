import { Injectable, Inject } from '@nestjs/common'
import { DriverRepository } from 'src/database/repositories/driver.repository'
import { inyectionTokens } from 'src/database/repositories/inyections-tokens'
import { driverResponseDto } from './dto/driverResponse.dto'
import { mapDriverEntityToDto } from './mapper/driverMapper.entity'
import { ResponseDto } from 'src/common/response.dto'
import dayjs from 'dayjs'

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
    radiusInKms: number,
  ): Promise<driverResponseDto[]> {

    const historyDriversNearBy =
      await this.driverRepository.searchNearbyLocationRadio(
        latitud,
        longitud,
        this.calculateRadiusInDegrees(radiusInKms),
        this.availableLocationDatetime(),
      )

    const nearByDriversIds = historyDriversNearBy.map(
      (x) => x.driver_assignment_id,
    )

    const nearByDrivers =
      await this.driverRepository.findAllAvailableByIds(nearByDriversIds)

    if (nearByDrivers.length === 0) return []

    return nearByDrivers.map((x) => mapDriverEntityToDto(x))
  }

  async searchClosestDrivers(
    latitud: string,
    longitud: string,
    limit: number,
  ): Promise<driverResponseDto[]> {

    const historyDriversNearBy =
      await this.driverRepository.searchClosestLocation(
        latitud,
        longitud,
        limit,
        this.availableLocationDatetime(),
      )

    const nearByDriversIds = historyDriversNearBy.map(
      (x) => x.driver_assignment_id,
    )

    const nearByDrivers =
      await this.driverRepository.findAllAvailableByIds(nearByDriversIds)

    if (nearByDrivers.length === 0) return []

    return nearByDrivers.map((x) => mapDriverEntityToDto(x))
  }

  private availableLocationDatetime = (): string => {
    const now = dayjs()

    const lastAvailableLocationTime = now.subtract(2, 'minute')

    return lastAvailableLocationTime.format('YYYY-MM-DD HH:mm:ss')
  }

  private calculateRadiusInDegrees = (radiusInKms: number) : number => {
    const KILOMETERS_TO_DEGREES = 111.32

    return (radiusInKms * 1000) / KILOMETERS_TO_DEGREES
  }
}
