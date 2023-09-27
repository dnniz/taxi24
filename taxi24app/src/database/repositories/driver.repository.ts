// Infrastructure
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
}
