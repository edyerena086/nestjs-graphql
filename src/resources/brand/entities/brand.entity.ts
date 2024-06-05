import { ObjectType, Int, Field } from '@nestjs/graphql'

@ObjectType()
export class Brand {
  @Field(() => Int)
  id: number

  @Field()
  name: string
}
