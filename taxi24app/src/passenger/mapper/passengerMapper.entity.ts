import { PassengerEntity } from 'src/database/entities'
import { passengerResponseDto } from '../dto/passengerResponse.dto'

export const mapPassengerEntityToDto = (
  entity: PassengerEntity,
): passengerResponseDto => {
  return {
    passengerId: entity.passenger_id,
    names: entity.name,
    phone: entity.phone,
  }
}
