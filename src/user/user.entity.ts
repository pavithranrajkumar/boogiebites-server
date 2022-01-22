import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GENDER, USER_ROLES } from 'src/constants';
import { Restaurant } from 'src/restaurant/restaurant.entity';
import {
  Column,
  DeleteDateColumn,
  Entity, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

registerEnumType(USER_ROLES, {
  name: 'role',
});
registerEnumType(GENDER, {
  name: 'gender',
});

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'User ID' })
  id: string;

  @Field(() => String, { description: "User's First Name" })
  @Column('varchar', { length: 50 })
  firstName: string;

  @Field(() => String, { description: "User's Last Name", nullable: true })
  @Column('varchar', { length: 50, nullable: true })
  lastName: string;

  @Field(() => USER_ROLES, { description: "User's Role" })
  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: USER_ROLES.otherEmployee,
  })
  role: USER_ROLES;

  @Field(() => GENDER, { description: "User's Gender" })
  @Column({
    type: 'enum',
    enum: GENDER,
    nullable: false,
  })
  gender: GENDER;

  @Field(() => Number, { description: "User's Mobile" })
  @Column('bigint', { unique: true })
  mobile: number;

  @Field(() => Boolean, {
    description: "User's state ( Whether active or inactive) ",
  })
  @Column('boolean', { default: true })
  active: boolean;

  @Field()
  @DeleteDateColumn()
  deletedAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  //ASSOCIATIONS
  @OneToOne(() => Restaurant, restaurant => restaurant.manager)
  restaurant:Restaurant;
}
