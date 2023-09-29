import { Test, TestingModule } from '@nestjs/testing'
import { DriverService } from './driver.service'
import { driverResponseDto } from './dto/driverResponse.dto'
import { ResponseDto } from '../../common/response.dto'
import { DriverAssignmentEntity } from '../../infrastructure/entities'
import { DriverController } from './driver.controller'

describe('DriverController', () => {
  let controller: DriverController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        DriverService,
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
      ],
    }).compile()

    await module.init()

    controller = module.get<DriverController>(DriverController)
  })

  describe('all Drivers', () => {
    it('should return an array of drivers', async () => {
      const drivers: ResponseDto<driverResponseDto[]> = {
        data: [
          {
            driverId: 1,
            names: 'John Doe',
            phoneEnterprise: '123456',
            licenseNumber: 'ABC123',
          },
        ],
        errorCode: 1,
        message: 'Drivers were Found',
      }

      const result = await controller.allDrivers()

      expect(result).toEqual(drivers)
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
