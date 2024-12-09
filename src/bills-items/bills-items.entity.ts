import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Inventories } from '../inventories/inventories.entity';

@Entity({ name: 'bills_items' })
export class BillsItems {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bills, (bills) => bills.id)
  bills_id: number;

  @ManyToOne(() => Inventories, (inventories) => inventories.id, {
    nullable: true,
  })
  inventories_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  brand: string;

  @Column()
  name: string;

  @Column({ type: 'float', default: 0.0 })
  amount: number;

  @Column()
  price: number;

  @Column({ nullable: true })
  note: string;
}
