import { driverResponseDto } from 'src/driver/dto/driverResponse.dto'
import { passengerResponseDto } from 'src/passenger/dto/passengerResponse.dto'

export class tripResponseDto {
  tripId: number
  state: string
  driver: driverResponseDto
  startTripDatetime: Date
  passenger: passengerResponseDto
}
