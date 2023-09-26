import { Injectable, Inject } from '@nestjs/common'
import { DriverRepository } from 'src/database/repositories/driver.repository'
import { inyectionTokens } from 'src/database/repositories/inyections-tokens'
import { driverResponseDto } from './dto/driverResponse.dto'
import { mapDriverEntityToDto } from './mapper/driverMapper.entity'

@Injectable()
export class DriverService {
  constructor(
    @Inject(inyectionTokens.driverRepository)
    private readonly driverRepository: DriverRepository,
  ) {}

  async searchAvailableDrivers(): Promise<driverResponseDto[]> {
    const result = await this.driverRepository.findBySpecification({
      available: true,
    })

    if (result.length === 0) return []

    return result.map((x) => mapDriverEntityToDto(x))
  }
}
