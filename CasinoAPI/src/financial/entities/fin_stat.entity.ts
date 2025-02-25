import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';

@Entity('fin_stats')
export class FinancialStatistic {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false, name: 'account_id' })
  public accountId: number;

  @Column({ nullable: false, name: 'credits', default: 0 })
  public credits: number;

  @Column({ nullable: false, name: 'ballance', default: 0 })
  public ballance: number;

  @ManyToOne(() => Account, { nullable: false, persistence: false })
  @JoinColumn({ name: 'account_id' })
  private _account: never;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
