import { TripEntity } from '../../infrastructure/entities'
import { tripResponseDto } from '../dto/tripResponse.dto'
import { mapDriverEntityToDto } from 'src/driver/mapper/driverMapper.entity'
import { mapPassengerEntityToDto } from 'src/passenger/mapper/passengerMapper.entity'

export const mapTripEntityToDto = (entity: TripEntity): tripResponseDto => {
  return {
    tripId: entity.trip_id,
    state: entity.state,
    driver: mapDriverEntityToDto(entity.driver_assignment),
    startTripDatetime: entity.start_datetime_trip,
    passenger: mapPassengerEntityToDto(entity.passenger)
  }
}
