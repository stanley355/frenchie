import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Inventories } from '../inventories/inventories.entity';
import { Bills } from '../bills/bills.entity';
import { InventoriesLogs } from '../inventories-logs/inventories-logs.entity';

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

  @OneToOne(() => InventoriesLogs, (inventoriesLogs) => inventoriesLogs.id, {
    nullable: true,
  })
  inventories_logs_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  brand: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'float', default: 0.0 })
  amount: number;

  @Column({ nullable: true })
  unit: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  note: string;
}
