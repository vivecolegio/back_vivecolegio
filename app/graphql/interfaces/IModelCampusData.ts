import { Field, ID, InterfaceType } from 'type-graphql';
import { Column, CreateDateColumn, Index, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { Campus } from '../models/GeneralAdministrator/Campus';

@InterfaceType()
export abstract class IModelCampusData {
  @Field(() => ID)
  @ObjectIdColumn()
  id!: string;

  @Index("index_campusId")
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  campusId?: string;

  @Field(() => Campus, { nullable: true })
  campus?: Campus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  active?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'number', default: 0 })
  version!: number;

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  createdByUserId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  updatedByUserId?: string;
}
