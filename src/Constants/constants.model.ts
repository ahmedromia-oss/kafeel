import { BaseEntity } from 'shared/shared.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Constants extends BaseEntity {
  @PrimaryColumn({ default: 'constants' })
  id: string;

  @Column({ type: 'text' })
  aboutEn: string;

  @Column({ type: 'text' })
  aboutAr: string;

  @Column({ type: 'text' })
  aboutBn: string;

  @Column({ type: 'text' })
  aboutHi: string;

  @Column({ type: 'text' })
  aboutUr: string;

  @Column({ type: 'text' })
  privacyPolicyEn: string;

  @Column({ type: 'text' })
  privacyPolicyAr: string;

  @Column({ type: 'text' })
  privacyPolicyBn: string;

  @Column({ type: 'text' })
  privacyPolicyHi: string;

  @Column({ type: 'text' })
  privacyPolicyUr: string;
}

