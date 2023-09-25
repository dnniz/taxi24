import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TripEntity } from './trip.entity';

@Entity('location')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  location_id: number;

  @ManyToOne(() => TripEntity, { eager: true })
  @JoinColumn({ name: 'trip_id' })
  trip: TripEntity;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326 })
  coordenate: { type: string; coordinates: number[] };

  @Column({ type: 'varchar', length: 100 })
  country_name: string;

  @Column({ type: 'varchar', length: 100 })
  city_name: string;

  @Column({ type: 'varchar', length: 100 })
  part_trip: string;
}
