import { Field, InputType } from '@nestjs/graphql';
import { GENDER, USER_ROLES } from 'src/constants';

@InputType()
export class AddUserInput {
  @Field() readonly firstName: string;
  @Field({ nullable: true }) readonly lastName?: string;
  @Field()
  readonly role: USER_ROLES;
  @Field()
  readonly gender: GENDER;
  @Field() readonly mobile: number;
  @Field({ defaultValue: true }) readonly active: boolean;
}
