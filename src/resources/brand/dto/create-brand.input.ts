import { InputType, Field, PartialType, Int } from '@nestjs/graphql'
import { IsNotEmpty, MinLength } from 'class-validator'

@InputType()
export class CreateBrandInput {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  name: string
}

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  @Field(() => Int)
  id: number
}
