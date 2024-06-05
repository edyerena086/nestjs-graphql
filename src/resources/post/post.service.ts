import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

// Import prisma
import { PrismaService } from '../../prisma.service'
import { Post, Prisma } from '@prisma/client'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostInput: CreatePostInput) {
    return await this.prisma.post.create({ data: createPostInput })
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({ include: { comments: true } });
  }

  async findOne(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    const findPost = await this.prisma.post.findUnique({ where: postWhereUniqueInput, include: { comments: true } })

    if (!findPost) throw new NotFoundException('Post not found!')

    return findPost
  }

  async update(id: number, updatePostInput: UpdatePostInput): Promise<Post> {
    try {
      return await this.prisma.post.update({ where: { id: id }, data: updatePostInput})
    } catch (err) {
      throw new BadRequestException('Post id is not valid!')
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.post.delete({ where: { id: id } })
    } catch (err) {
      throw new BadRequestException('Post id is not valid!')
    }
  }
}
