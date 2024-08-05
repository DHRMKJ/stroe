import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { ACCESS_TOKEN_VALIDITY_IN_HOURS } from '../../../common/constant';
import { getValidity } from '../../../common/utils';
import { AccountEntity } from './account.entity';

@Entity('account_sessions')
export class AccountSessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => AccountEntity, (el) => el.sessions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account!: Promise<AccountEntity>;

  @RelationId((el: AccountSessionEntity) => el.account)
  accountId!: AccountEntity['id'];

  @Column({ name: 'last_logged_in' })
  loggedInAt: Date;

  @Column({ name: 'ip_address', type: 'text' })
  ipAddress!: string;

  @Column({ name: 'valid_till', type: 'timestamp' })
  validTill!: Date;

  get isExpired(): boolean {
    return this.validTill.getTime() < Date.now();
  }

  init(init: InitPayload) {
    this.account = Promise.resolve(init.account);
    this.ipAddress = init.ipAddress;
    this.validTill = getValidity(ACCESS_TOKEN_VALIDITY_IN_HOURS, 'hour');
    return this;
  }
}

type InitPayload = {
  account: AccountEntity;
  ipAddress: string;
};
