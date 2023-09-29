import { Test, TestingModule } from '@nestjs/testing'
import { TripController } from './trip.controller'
import { ResponseDto } from '../../common/response.dto'
import { tripResponseDto } from './dto/tripResponse.dto'
import { TripService } from './trip.service'
import {
  TripEntity,
  DriverAssignmentEntity,
  PassengerEntity,
} from '../../infrastructure/entities'

describe('TripController', () => {
  let controller: TripController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        TripService,
        {
          provide: 'TRIP_REPOSITORY',
          useValue: {
            findBySpecification: jest.fn(({}) => {
              const mock: TripEntity[] = [
                {
                  trip_id: 1,
                  driver_assignment: {
                    available: true,
                    driver: {
                      driver_id: 1,
                      license_number: 'ABC123',
                      phone_enterprise_number: '123456',
                      name: 'John Doe',
                      doc_number: '',
                      phone: '',
                      email: '',
                    },
                    vehicle_unit: {
                      car_brand: '',
                      color: '',
                      model: '',
                      license_plate: '',
                      type: '',
                      vehicle_unit_id: 1,
                    },
                    start_datetime_assignment: new Date(
                      '2023-09-29T04:38:31.967Z',
                    ),
                    end_datetime_assignment: new Date(
                      '2023-09-29T04:38:31.967Z',
                    ),
                  },
                  passenger: {
                    passenger_id: 1,
                    name: 'Tann Tsu',
                    doc_number: '12345678',
                    phone: '987654321',
                    email: 'tsu@gmail.com',
                  },
                  state: '',
                  start_datetime_trip: new Date('2023-09-29T04:38:31.967Z'),
                  end_datetime_trip: new Date('2023-09-29T04:38:31.967Z'),
                },
              ]
              return mock
            }),
          },
        },
        {
          provide: 'DRIVER_REPOSITORY',
          useValue: {
            findBySpecification: jest.fn(() => {
              const mock: DriverAssignmentEntity[] = [
                {
                  driver_assignment_id: 1,
                  driver: {
                    driver_id: 1,
                    license_number: 'ABC123',
                    phone_enterprise_number: '123456',
                    name: 'John Doe',
                    doc_number: '',
                    phone: '',
                    email: '',
                  },
                  vehicle_unit: {
                    car_brand: '',
                    color: '',
                    model: '',
                    license_plate: '',
                    type: '',
                    vehicle_unit_id: 1,
                  },
                  available: true,
                  start_datetime_assignment: new Date(
                    '2023-09-29T04:38:31.967Z',
                  ),
                  end_datetime_assignment: new Date('2023-09-29T04:38:31.967Z'),
                },
              ]
              return mock
            }),
          },
        },
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

    controller = module.get<TripController>(TripController)
  })

  describe('all active trips', () => {
    it('should return an array of passengers', async () => {
      const passengers: ResponseDto<tripResponseDto[]> = {
        data: [
          {
            driver: {
              driverId: undefined,
              licenseNumber: 'ABC123',
              names: 'John Doe',
              phoneEnterprise: '123456',
            },
            passenger: {
              names: 'Tann Tsu',
              passengerId: 1,
              phone: '987654321',
            },
            startTripDatetime: new Date('2023-09-29T04:38:31.967Z'),
            state: '',
            tripId: 1,
          },
        ],
        errorCode: 1,
        message: 'Viajes activos obtenidos con éxito',
      }

      const result = await controller.activeTrips()

      expect(result).toEqual(passengers)
    })
  })
})
