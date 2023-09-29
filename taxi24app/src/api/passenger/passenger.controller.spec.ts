import { Test, TestingModule } from '@nestjs/testing'
import { PassengerController } from './passenger.controller'
import { PassengerService } from './passenger.service'
import { PassengerEntity } from '../../infrastructure/entities'
import { passengerResponseDto } from './dto/passengerResponse.dto'
import { ResponseDto } from '../../common/response.dto'

describe('PassengerController', () => {
  let controller: PassengerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengerController],
      providers: [
        PassengerService,
        {
          provide: 'PASSENGER_REPOSITORY',
          useValue: {
            findBySpecification: jest.fn(() => {
              const mock: PassengerEntity[] = [
                {
                  passenger_id: 1,
                  name: 'Tann Tsu',
                  doc_number: '12345678',
                  phone: '987654321',
                  email: 'tsu@gmail.com',
                },
              ]
              return mock
            }),
          },
        },
      ],
    }).compile()

    await module.init()

    controller = module.get<PassengerController>(PassengerController)
  })

  describe('all Passenger', () => {
    it('should return an array of passengers', async () => {
      const passengers: ResponseDto<passengerResponseDto[]> = {
        data: [
          {
            passengerId: 1,
            names: 'Tann Tsu',
            phone: '987654321',
          },
        ],
        errorCode: 1,
        message: 'Passengers were Found',
      }

      const result = await controller.allPassengers()

      expect(result).toEqual(passengers)
    })
  })
})
