import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car } from './entities/car.entity'

import { CreateCarInput, UpdateCarInput } from './dto/create-car.input'

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Query(() => [Car], { name: 'cars', nullable: 'items' })
  async findAll() {
    return await this.carService.findAll()
  }

  @Query(() => Car, { name: 'car', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.carService.findOne({ id: id })
  }

  @Mutation(() => Car)
  async createCar(@Args('payload') createCarInput: CreateCarInput) {
    return await this.carService.create(createCarInput)
  }

  @Mutation(() => Car)
  async updateCar(@Args('payload') updateCarInput: UpdateCarInput) {
    return await this.carService.update(updateCarInput.id, updateCarInput)
  }

  @Mutation(() => Car)
  async removeCar(@Args('id', { type: () => Int }) id: number) {
    return await this.carService.remove(id)
  }
}
