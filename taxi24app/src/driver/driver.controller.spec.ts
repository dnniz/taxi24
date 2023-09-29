import { Test, TestingModule } from '@nestjs/testing'
import { DriverController } from './driver.controller'
import { DriverService } from './driver.service'
import { driverResponseDto } from './dto/driverResponse.dto'
// import { DriverRepository } from '../infrastructure/repositories/driver.repository'
import { ResponseDto } from '../common/response.dto'
import { DriverAssignmentEntity } from '../infrastructure/entities'

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
                  start_datetime_assignment: new Date(),
                  end_datetime_assignment: new Date(),
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

  describe('allDrivers', () => {
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
        message: 'Listado de todos los Conductores',
      }

      const result = await controller.allDrivers()

      expect(result).toEqual(drivers)
    })

    // it('should return an empty array if no drivers are found', async () => {
    //   jest.spyOn(service, 'searchAllDrivers').mockResolvedValue([])

    //   const result = await controller.allDrivers()

    //   expect(result).toEqual([])
    // })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
