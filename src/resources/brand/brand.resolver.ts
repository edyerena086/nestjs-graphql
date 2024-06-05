import { Resolver, Query, Mutation, Int, Args } from '@nestjs/graphql';
import { BrandService } from './brand.service';

import { CreateBrandInput, UpdateBrandInput } from './dto/create-brand.input'

import { Brand } from './entities/brand.entity'

@Resolver()
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query(() => [Brand], { name: 'brands', nullable: 'items' })
  async findAll() {
    return await this.brandService.findAll()
  }

  @Query(() => Brand, { name: 'brand', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.brandService.findOne({ id: id })
  }

  @Mutation(() => Brand)
  async createBrand(@Args('payload') createBrandInput: CreateBrandInput) {
    return await this.brandService.create(createBrandInput)
  }

  @Mutation(() => Brand)
  async updateBrand(@Args('payload') updateBrandInput: UpdateBrandInput) {
    return await this.brandService.update(updateBrandInput.id, updateBrandInput)
  }

  @Mutation(() => Brand)
  async removeBrand(@Args('id', { type: () => Int}) id: number) {
    return await this.brandService.remove(id)
  }

}
