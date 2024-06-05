import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  @MinLength(5)
  title: string

  @Field()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1500)
  text: string
}
