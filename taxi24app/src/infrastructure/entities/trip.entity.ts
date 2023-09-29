import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { DriverAssignmentEntity } from './driverAssignment.entity'
import { PassengerEntity } from './passenger.entity'

@Entity('trip')
export class TripEntity {
  @PrimaryGeneratedColumn()
  trip_id?: number

  @ManyToOne(() => DriverAssignmentEntity, { eager: false })
  @JoinColumn({ name: 'driver_assignment_id' })
  driver_assignment?: DriverAssignmentEntity

  @ManyToOne(() => PassengerEntity, { eager: false })
  @JoinColumn({ name: 'passenger_id' })
  passenger?: PassengerEntity

  @Column({ type: 'varchar', length: 100 })
  state?: string

  @Column({ type: 'timestamp', nullable: true })
  start_datetime_trip?: Date

  @Column({ type: 'timestamp', nullable: true })
  end_datetime_trip?: Date
}
