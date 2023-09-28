import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { PersonBaseEntity } from './person.base.entity'

@Entity('passenger')
export class PassengerEntity extends PersonBaseEntity {
  @PrimaryGeneratedColumn()
  passenger_id?: number
}
