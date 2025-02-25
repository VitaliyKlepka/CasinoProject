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

@Entity('auth_sessions')
export class AuthSession {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false, name: 'account_id' })
  public accountId: number;

  @Column({ nullable: false, name: 'device_id' })
  public deviceId: string;

  @ManyToOne(() => Account, { nullable: false, persistence: false })
  @JoinColumn({ name: 'account_id' })
  private _account: never;

  @Column({ type: 'text' })
  public payload: string;

  @Column({ type: 'timestamp' })
  public expires_at: Date;

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
