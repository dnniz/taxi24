import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DriverAssignmentEntity } from './driverAssignment.entity';
import { PassengerEntity } from './passenger.entity';

@Entity('trip')
export class TripEntity {
  @PrimaryGeneratedColumn()
  trip_id: number;

  @ManyToOne(() => DriverAssignmentEntity, { eager: true })
  @JoinColumn({ name: 'driver_assignment_id' })
  driver_assignment: DriverAssignmentEntity;

  @ManyToOne(() => PassengerEntity, { eager: true })
  @JoinColumn({ name: 'passenger_id' })
  passenger: PassengerEntity;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'timestamp' })
  start_datetime_trip: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_datetime_trip: Date;
}
