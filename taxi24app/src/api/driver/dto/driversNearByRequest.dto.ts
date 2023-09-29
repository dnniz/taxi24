import { ApiProperty } from '@nestjs/swagger'

export class driverResponseDto {
  @ApiProperty({ example: '-12.0432', description: 'latitude' })
  latitude: string
  @ApiProperty({ example: '-77.0282', description: 'longitude' })
  longitude: string
}
