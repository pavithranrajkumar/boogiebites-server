import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('restaurants')
@ObjectType()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Restaurant ID' })
  id: string;

  @Field(() => String, { description: "Restaurant Name" })
  @Column('varchar', { length: 50 })
  name: string;

  @Field(() => String, { description: "Restaurant Location" })
  @Column('varchar', { length: 150 })
  location: string;

  @Field(() => Boolean, {
    description: "Restaurant's status ( Whether active or inactive) ",
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
  @Field(()=>User)
  @OneToOne(()=>User,user=>user.restaurant)
  @JoinColumn()
  manager:User

  @Field()
  @Column('string')
  managerId:string

}
