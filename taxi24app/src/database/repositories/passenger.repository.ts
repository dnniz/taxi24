// Infrastructure
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PassengerEntity } from '../entities'

@Injectable()
export class PassengerRepository {
  constructor(
    @InjectRepository(PassengerEntity)
    private readonly dao: Repository<PassengerEntity>,
  ) {}

  async create(entity: PassengerEntity): Promise<PassengerEntity> {
    return await this.dao.save(entity)
  }

  async update(id: number, entity: PassengerEntity): Promise<any> {
    const result = await this.dao.update(id, entity)
    return result.affected
  }

  async findById(passengerId: number): Promise<any> {
    return await this.dao.findOneBy({ passenger_id: passengerId })
  }
}
