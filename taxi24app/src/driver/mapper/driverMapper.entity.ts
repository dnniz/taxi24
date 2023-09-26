import { DriverAssignmentEntity } from 'src/database/entities'
import { driverResponseDto } from '../dto/driverResponse.dto'

export const mapDriverEntityToDto = (
  entity: DriverAssignmentEntity,
): driverResponseDto => {
  return {
    driverId: entity.driver_assignment_id,
  }
}
