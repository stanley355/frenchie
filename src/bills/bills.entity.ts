import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bills' })
export class Bills {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  item_count: number;

  @Column()
  total_price: number;

  @Column()
  final_price: number;

  @Column({ nullable: true })
  note: string;
}
