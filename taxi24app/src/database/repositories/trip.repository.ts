// Infrastructure
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TripEntity } from '../entities'

@Injectable()
export class TripRepository {
  constructor(
    @InjectRepository(TripEntity)
    private readonly dao: Repository<TripEntity>,
  ) {}

  async create(entity: TripEntity): Promise<TripEntity> {
    return await this.dao.save(entity)
  }

  async update(id: number, entity: TripEntity): Promise<any> {
    const result = await this.dao.update(id, entity)
    return result.affected
  }

  async findById(tripId: number): Promise<any> {
    return await this.dao.findOneBy({ trip_id: tripId })
  }
}
