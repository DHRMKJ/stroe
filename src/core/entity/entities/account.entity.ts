import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountSessionEntity } from './account-session.entity';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'google_user_id', type: 'text', unique: true })
  googleUserId!: string;

  @Column({ name: 'email', type: 'text', unique: true })
  email!: string;

  @OneToMany(() => AccountSessionEntity, (el) => el.account)
  sessions!: Promise<AccountSessionEntity[]>;

  init(init: InitPayload) {
    this.googleUserId = init.googleUserId;
    this.email = init.email.toLowerCase();
    return this;
  }
}

type InitPayload = {
  googleUserId: string;
  email: string;
};
