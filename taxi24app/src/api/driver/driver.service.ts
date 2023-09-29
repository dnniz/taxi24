import { Injectable, Inject } from '@nestjs/common'
import { DriverRepository } from '../../infrastructure/repositories/driver.repository'
import { inyectionTokens } from '../../infrastructure/repositories/inyections-tokens'
import { driverResponseDto } from './dto/driverResponse.dto'
import { mapDriverEntityToDto } from './mapper/driverMapper.entity'
import { ResponseDto } from '../../common/response.dto'
import dayjs from 'dayjs'
import { responseStatusEnum } from '../../common/constants/responseStatus.enum'

@Injectable()
export class DriverService {
  constructor(
    @Inject(inyectionTokens.driverRepository)
    private readonly driverRepository: DriverRepository,
  ) {}

  async searchAllDrivers(): Promise<ResponseDto<driverResponseDto[]>> {
    const result = await this.driverRepository.findBySpecification({})

    if (result.length === 0)
      return new ResponseDto([], 'No drivers found', responseStatusEnum.Warning)

    const drivers = result.map((entity) => mapDriverEntityToDto(entity))

    return new ResponseDto(drivers, 'Drivers were Found')
  }

  async searchAvailableDrivers(): Promise<ResponseDto<driverResponseDto[]>> {
    const result = await this.driverRepository.findBySpecification({
      available: true,
    })

    if (result.length === 0)
      return new ResponseDto(
        [],
        'No available drivers found',
        responseStatusEnum.Warning,
      )

    const drivers = result.map((entity) => mapDriverEntityToDto(entity))

    return new ResponseDto(drivers, 'Available drivers were found')
  }

  async searchDriverById(id: number): Promise<ResponseDto<driverResponseDto>> {
    const driverNotFound = undefined
    const result = await this.driverRepository.findById(id)

    if (!result)
      return new ResponseDto(
        driverNotFound,
        'Driver Not Found',
        responseStatusEnum.Warning,
      )

    return new ResponseDto(mapDriverEntityToDto(result), 'Driver Found')
  }

  async searchNearByDrivers(
    latitud: string,
    longitud: string,
    radiusInKms: number,
  ): Promise<ResponseDto<driverResponseDto[]>> {
    const historyDriversNearBy =
      await this.driverRepository.searchNearbyLocationRadio(
        latitud,
        longitud,
        this.calculateRadiusInDegrees(radiusInKms),
        this.availableLocationDatetime(),
      )

    const nearByDriversIds = historyDriversNearBy.map(
      (driver) => driver.driver_assignment_id,
    )

    const nearByDrivers =
      await this.driverRepository.findAllAvailableByIds(nearByDriversIds)

    if (nearByDrivers.length === 0)
      return new ResponseDto(
        [],
        'Near drivers Not Found',
        responseStatusEnum.Warning,
      )

    const drivers = nearByDrivers.map((entity) => mapDriverEntityToDto(entity))

    return new ResponseDto(drivers, 'Drivers nearby by radius kilometers')
  }

  async searchClosestDrivers(
    latitud: string,
    longitud: string,
    limit: number,
  ): Promise<ResponseDto<driverResponseDto[]>> {
    const historyDriversNearBy =
      await this.driverRepository.searchClosestLocation(
        latitud,
        longitud,
        limit,
        this.availableLocationDatetime(),
      )

    const nearByDriversIds = historyDriversNearBy.map(
      (entity) => entity.driver_assignment_id,
    )

    const nearByDrivers =
      await this.driverRepository.findAllAvailableByIds(nearByDriversIds)

    if (nearByDrivers.length === 0)
      return new ResponseDto(
        [],
        'Closest drivers Not Found',
        responseStatusEnum.Warning,
      )

    const drivers = nearByDrivers.map((entity) => mapDriverEntityToDto(entity))

    return new ResponseDto(drivers, 'Drivers closest by limit closest')
  }

  private availableLocationDatetime = (): string => {
    const now = dayjs()

    const lastAvailableLocationTime = now.subtract(2, 'minute')

    return lastAvailableLocationTime.format('YYYY-MM-DD HH:mm:ss')
  }

  private calculateRadiusInDegrees = (radiusInKms: number): number => {
    const KILOMETERS_TO_DEGREES = 111.32

    return (radiusInKms * 1000) / KILOMETERS_TO_DEGREES
  }
}
