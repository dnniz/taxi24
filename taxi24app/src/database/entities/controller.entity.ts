import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('controller')
export class ControllerEntity {
  @PrimaryGeneratedColumn()
  controller_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  license_number: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_enterprise_number: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  doc_number: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;
}
