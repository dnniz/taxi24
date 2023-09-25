import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TripEntity } from './trip.entity';

@Entity('pilot_trip')
export class PilotTripEntity {
  @PrimaryGeneratedColumn()
  pilot_trip_id: number;

  @ManyToOne(() => TripEntity, { eager: true })
  @JoinColumn({ name: 'trip_id' })
  trip: TripEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  distance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  offer: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @Column({ type: 'timestamp' })
  arrive_time: Date;
}
