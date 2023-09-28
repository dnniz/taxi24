import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('passenger')
export class PassengerEntity {
  @PrimaryGeneratedColumn()
  passenger_id?: number

  @Column({ type: 'varchar', length: 255 })
  name?: string

  @Column({ type: 'varchar', length: 100 })
  doc_number?: string

  @Column({ type: 'varchar', length: 25, nullable: true })
  phone?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string
}
