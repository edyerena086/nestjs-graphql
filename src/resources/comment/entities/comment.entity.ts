import { ObjectType, Int, Field } from '@nestjs/graphql'

// Import other entities
import { Post } from '../../post/entities/post.entity'

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number

  @Field()
  author: string

  @Field()
  comment: string

  @Field(() => Post)
  post: Post
}
