import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field(() => String, { description: "Restaurant Name" })
  name: string;

  @Field(() => String, { description: "Restaurant Location" })
  location: string;

  @Field(() => Boolean, {
    defaultValue:true,
    description: "Restaurant's status ( Whether active or inactive) ",
  })
  active: boolean;

  @Field(() => String, { description: "Restaurant Manager ID" })
  managerId:string
}
