import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountSessionEntity } from './account-session.entity';
import { IsEmail } from 'class-validator';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'email', type: 'text', unique: true })
  @IsEmail()
  email!: string;

  @Column({ name: 'username', type: 'text', unique: true })
  username!: string;

  @Column({ name: 'global_name', type: 'text' })
  name!: string;

  @Column({ name: 'discord_id', type: 'text', unique: true })
  discordId!: string;

  @Column({ name: 'accent_color', type: 'text' })
  accentColor: string;

  @Column({ name: 'banner_color', type: 'text' })
  bannerColor: string;

  @Column({ name: 'verified', type: 'bool' })
  verified!: boolean;

  @Column({ name: 'avatar_id', type: 'text' })
  avatarId: string;

  @Column({ name: 'mfa_enabled', type: 'bool' })
  mfaEnabled!: boolean;
  // @Column({ name: 'mobile_number', type: 'text', unique: true })
  // mobileNo: string;

  @Column({ name: 'locale', type: 'text' })
  locale: string;

  @OneToMany(() => AccountSessionEntity, (el) => el.account)
  sessions!: Promise<AccountSessionEntity[]>;

  init(init: InitPayload) {
    this.email = init.email.toLowerCase();
    this.discordId = init.id;
    this.username = init.username;
    this.avatarId = init.avatar;
    this.accentColor = init.accent_color;
    this.bannerColor = init.banner_color;
    this.locale = init.locale;
    this.mfaEnabled = init.mfa_enabled;
    this.name = init.global_name;
    this.verified = init.verified;
    return this;
  }
}

type InitPayload = {
  email: string;
  id: string;
  username: string;
  avatar: string;
  accent_color: string;
  global_name: string;
  banner_color: string;
  mfa_enabled: boolean;
  locale: string;
  verified: boolean;
};
