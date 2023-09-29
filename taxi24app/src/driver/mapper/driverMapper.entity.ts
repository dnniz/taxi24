import { DriverAssignmentEntity } from '../../infrastructure/entities'
import { driverResponseDto } from '../dto/driverResponse.dto'

export const mapDriverEntityToDto = (
  entity: DriverAssignmentEntity,
): driverResponseDto => {
  return {
    driverId: entity.driver_assignment_id,
    licenseNumber: entity.driver.license_number,
    names: entity.driver.name,
    phoneEnterprise: entity.driver.phone_enterprise_number,
  }
}
