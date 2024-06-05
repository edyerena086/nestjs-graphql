import { ObjectType, Field, Int } from '@nestjs/graphql';

// Import other entities
import { Comment } from '../../comment/entities/comment.entity'

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string

  @Field()
  text: string

  @Field(() => [Comment], { nullable: 'itemsAndList' })
  comments?: Comment[]
}
