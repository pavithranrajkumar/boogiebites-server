import { Field, InputType, PartialType } from '@nestjs/graphql';
import { AddUserInput } from './add-user.input';

@InputType()
export class UpdateUserInput extends PartialType(AddUserInput) {
  @Field() readonly id: string;
}
