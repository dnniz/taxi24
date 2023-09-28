import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { DriverAssignmentEntity } from './driverAssignment.entity'

@Entity('history_driver_location')
export class HistoryDriverLocationEntity {
  @PrimaryGeneratedColumn()
  history_driver_location_id: number

  @ManyToOne(() => DriverAssignmentEntity, { eager: false })
  @JoinColumn({ name: 'driver_assignment_id' })
  driver_assignment?: DriverAssignmentEntity

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  coordenate: { type: string; coordinates: number[] }

  @Column({ type: 'timestamp', nullable: true })
  location_datetime?: Date
}
