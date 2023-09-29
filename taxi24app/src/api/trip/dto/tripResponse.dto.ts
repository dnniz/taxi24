import { driverResponseDto } from '../../driver/dto/driverResponse.dto'
import { passengerResponseDto } from '../../passenger/dto/passengerResponse.dto'

export class tripResponseDto {
  tripId: number
  state: string
  driver: driverResponseDto
  startTripDatetime: Date
  passenger: passengerResponseDto
}
