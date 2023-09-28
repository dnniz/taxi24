import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { DriverEntity } from './driver.entity'
import { VehicleUnitEntity } from './vehicleUnit.entity'

@Entity('driver_assignment')
export class DriverAssignmentEntity {
  @PrimaryGeneratedColumn()
  driver_assignment_id?: number

  @ManyToOne(() => DriverEntity, { eager: true })
  @JoinColumn({ name: 'driver_id' })
  driver?: DriverEntity

  @ManyToOne(() => VehicleUnitEntity, { eager: false })
  @JoinColumn({ name: 'vehicle_unit_id' })
  vehicle_unit?: VehicleUnitEntity

  // @Column({ type: 'varchar', length: 255, nullable: true })
  // current_location?: string

  @Column({ type: 'boolean' })
  available?: boolean

  @Column({ type: 'timestamp' })
  start_datetime_assignment?: Date

  @Column({ type: 'timestamp', nullable: true })
  end_datetime_assignment?: Date
}
