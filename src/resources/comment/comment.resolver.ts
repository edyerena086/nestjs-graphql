import { Resolver, Query, Int, Mutation, Args } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput, UpdateCommentInput } from './dto/create-comment.input'

import { Comment } from './entities/comment.entity'

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment], { name: 'comments', nullable: 'items' })
  async findAll() {
    return await this.commentService.findAll()
  }

  @Query(() => Comment, { name: 'comment' })
  async findOne(@Args('id') id: number) {
    return await this.commentService.findOne({ id })
  }

  @Mutation(() => Comment)
  async createComment(@Args('payload') createCommentInput: CreateCommentInput) {
    return await this.commentService.create(createCommentInput)
  }

  @Mutation(() => Comment)
  async updateComment(@Args('payload') updateCommentInput: UpdateCommentInput) {
    return await this.commentService.update(updateCommentInput.id, updateCommentInput)
  }

  @Mutation(() => Comment)
  async removeComment(@Args('id', { type: () => Int }) id: number) {
    return await this.commentService.remove(id)
  }

}
