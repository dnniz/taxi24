import { TripEntity } from '../../../infrastructure/entities'
import { tripResponseDto } from '../dto/tripResponse.dto'
import { mapDriverEntityToDto } from '../../driver/mapper/driverMapper.entity'
import { mapPassengerEntityToDto } from '../../passenger/mapper/passengerMapper.entity'

export const mapTripEntityToDto = (entity: TripEntity): tripResponseDto => {
  return {
    tripId: entity.trip_id,
    state: entity.state,
    driver: mapDriverEntityToDto(entity.driver_assignment),
    startTripDatetime: entity.start_datetime_trip,
    passenger: mapPassengerEntityToDto(entity.passenger),
  }
}
