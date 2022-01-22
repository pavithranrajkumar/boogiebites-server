import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRespository: Repository<Restaurant>,
  ) {}

  async createRestaurant(createRestaurantInput: CreateRestaurantInput): Promise<Restaurant> {
    const restaurant = await this.restaurantRespository.create(createRestaurantInput);
    return await this.restaurantRespository.save(restaurant);
  }

  async findAll() {
    const restaurants=await this.restaurantRespository.find({relations:['manager']});
    console.log(restaurants);
    return restaurants
  }

  async findOne(id:string){
    const restaurant=await this.restaurantRespository.findOne(id,{relations:['manager']});
    return restaurant
  }

  async updateRestaurant(id: string, updateRestaurantInput: UpdateRestaurantInput){
    const user = await this.restaurantRespository.preload({
      id,
      ...updateRestaurantInput,
    });
    if (!user) {
      throw new Error("Restaurant not found!")
    }
    return this.restaurantRespository.save(user);
  }

  async remove(id){
    const restaurant=await this.restaurantRespository.softDelete(id);
    if(!restaurant) throw new Error("Restaurant not found")
    return true
  }
}
