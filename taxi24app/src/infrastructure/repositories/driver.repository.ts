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

  async findAllAvailableByIds(
    driversIds: number[],
  ): Promise<DriverAssignmentEntity[]> {
    return await this.dao.find({
      where: {
        driver_assignment_id: In(driversIds),
        available: true,
      },
    })
  }

  async searchNearbyLocationRadio(
    latitud: string,
    longitud: string,
    radiusInDegrees: number,
    availableLocationTime: string,
  ): Promise<DriverAssignmentEntity[]> {
    const queryGetDriversWithinRadius = `
    SELECT *
    FROM history_driver_location AS location
    WHERE ST_Distance(
      ST_Transform(location.coordenate, 2163),
      ST_Transform(ST_GeomFromText('POINT(${longitud} ${latitud})', 4326), 2163)
    ) < ${radiusInDegrees}
    AND location.location_datetime >= '${availableLocationTime}';`

    return await this.dao.query(queryGetDriversWithinRadius)
  }

  async searchClosestLocation(
    latitud: string,
    longitud: string,
    limit: number,
    availableLocationTime: string,
  ): Promise<DriverAssignmentEntity[]> {
    const queryGetDriversWithinTheClosestOnes = `
    SELECT *
    FROM history_driver_location AS location
    WHERE location.location_datetime >= '${availableLocationTime}'
    ORDER BY ST_Distance(
      ST_Transform(location.coordenate, 2163),
      ST_Transform(ST_GeomFromText('POINT(${longitud} ${latitud})', 4326), 2163)
    )
    LIMIT ${limit};`

    return await this.dao.query(queryGetDriversWithinTheClosestOnes)
  }
}
