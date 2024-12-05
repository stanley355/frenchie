import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Inventories } from '../inventories/inventories.entity';
export enum InventoriesLogsAction {
  Addition = 'addition',
  Substraction = 'substraction',
}

@Entity({ name: 'inventories_logs' })
export class InventoriesLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inventories, (inventories) => inventories.id)
  inventories_id: number;

  @CreateDateColumn()
  created_at: Date;

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

  @Column({ type: 'enum', enum: InventoriesLogsAction, nullable: true })
  action: InventoriesLogsAction;

  @Column()
  brand: string;
}
