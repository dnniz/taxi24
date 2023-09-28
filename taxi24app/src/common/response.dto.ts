import { ApiProperty } from '@nestjs/swagger'
import { responseStatusEnum } from './constants/responseStatus.enum'

export class ResponseDto<T> {
  @ApiProperty()
  data: T

  @ApiProperty({ default: '', description: 'Mensaje de respuesta' })
  message: string

  @ApiProperty({ default: 1, description: 'Código de error' })
  errorCode: number

  constructor(
    data: T,
    message: string = '',
    errorCode: number = responseStatusEnum.Success,
  ) {
    this.data = data
    this.message = message
    this.errorCode = errorCode
  }
}
