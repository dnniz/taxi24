// Infrastructure
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { DriverAssignmentEntity } from '../entities'

@Injectable()
export class DriverRepository {
  constructor(
    @InjectRepository(DriverAssignmentEntity)
    private readonly dao: Repository<DriverAssignmentEntity>,
  ) {}

  async create(
    entity: DriverAssignmentEntity,
  ): Promise<DriverAssignmentEntity> {
    return await this.dao.save(entity)
  }

  async update(id: number, entity: DriverAssignmentEntity): Promise<any> {
    const result = await this.dao.update(id, entity)
    return result.affected
  }

  async findById(driverId: number): Promise<DriverAssignmentEntity | null> {
    return await this.dao.findOneBy({ driver_assignment_id: driverId })
  }

  async findBySpecification(
    entity: DriverAssignmentEntity,
  ): Promise<DriverAssignmentEntity[]> {
    return await this.dao.find({ where: { ...entity } })
  }

  async findAllByIds(driversIds: number[]): Promise<DriverAssignmentEntity[]> {
    return await this.dao.find({
      where: {
        driver_assignment_id: In(driversIds),
      },
    })
  }

  async searchNearLocation(
    latitud: string,
    longitud: string,
    radioInKilometers: number,
  ): Promise<DriverAssignmentEntity[]> {
    const location = `POINT(${longitud} ${latitud})` //SRID=4326;
    const lastAvailableLocationTime = new Date()
    lastAvailableLocationTime.setMinutes(
      lastAvailableLocationTime.getMinutes() - 2,
    )
    const formattedDateTime = lastAvailableLocationTime
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')

    const KILOMETERS_TO_DEGREES = 111.32

    const radioInDegrees = radioInKilometers / KILOMETERS_TO_DEGREES

    const query = `
    SELECT *
    FROM history_driver_location AS location
    WHERE ST_Distance(location.coordenate, ST_GeomFromText('${location}', 4326)) < ${radioInDegrees}
    AND location.location_datetime >= '${formattedDateTime}';`

    return await this.dao.query(query)
  }
}
