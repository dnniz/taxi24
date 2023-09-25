import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('vehicle_unit')
export class VehicleUnitEntity {
  @PrimaryGeneratedColumn()
  vehicle_unit_id: number;

  @Column({ type: 'varchar', length: 255 })
  license_plate: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  color: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  car_brand: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  model: string;
}
