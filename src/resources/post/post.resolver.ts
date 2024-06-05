import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { nullable: 'items', name: 'posts' })
  async findAll() {
    return await this.postService.findAll()
  }

  @Query(() => Post, { nullable: true, name: 'post' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.postService.findOne({ id })
  }

  @Mutation(() => Post)
  async createPost(@Args('payload') createPostInput: CreatePostInput) {
    return await this.postService.create(createPostInput)
  }

  @Mutation(() => Post)
  async updatePost(@Args('payload') updatePostInput: UpdatePostInput) {
    return await this.postService.update(updatePostInput.id, updatePostInput)
  }

  @Mutation(() => Post)
  async removePost(@Args('id', { type: () => Int }) id: number) {
    return await this.postService.remove(id)
  }
}
