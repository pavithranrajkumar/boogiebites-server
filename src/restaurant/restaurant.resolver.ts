import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => Restaurant)
  createRestaurant(@Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput) {
    return this.restaurantService.createRestaurant(createRestaurantInput);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  findAll() {
    return this.restaurantService.findAll();
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.restaurantService.findOne(id);
  }

  @Mutation(() => Restaurant)
  updateRestaurant(@Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput) {
    return this.restaurantService.updateRestaurant(updateRestaurantInput.id, updateRestaurantInput);
  }

  @Mutation(() => Restaurant)
  removeRestaurant(@Args('id', { type: () => String }) id: string) {
    return this.restaurantService.remove(id);
  }
}
