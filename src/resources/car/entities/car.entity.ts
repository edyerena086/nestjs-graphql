import { ObjectType, Int, Field } from '@nestjs/graphql'

import { Brand } from '../../brand/entities/brand.entity'

@ObjectType()
export class Car {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  description: string

  @Field(() => Brand)
  brand: Brand
}
