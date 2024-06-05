import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import {} from 'class-validator'

@InputType()
export class CreateCommentInput {
  @Field()
  author: string

  @Field()
  comment: string

  @Field(() => Int)
  postId: number
}

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => Int)
  id: number
}

