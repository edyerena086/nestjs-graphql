import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class CreateCarInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field(() => Int)
  brandId: number
}

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  @Field(() => Int)
  id: number
}
