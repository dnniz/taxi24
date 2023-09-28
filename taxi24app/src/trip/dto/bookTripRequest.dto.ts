import { ApiProperty } from '@nestjs/swagger';

export class bookTripRequestDto {
  @ApiProperty({ example: '1', description: 'Passenger Id' })
  passengerId: number

  @ApiProperty({ example: '1', description: 'Driver Id' })
  driverId: number
}
