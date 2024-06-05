import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentInput, UpdateCommentInput } from './dto/create-comment.input'

// Import prisma
import { PrismaService } from '../../prisma.service'
import { Comment, Prisma } from '@prisma/client'

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      include: {
        post: true
      }
    })
  }

  async findOne(commentWhereUniqueInput: Prisma.CommentWhereUniqueInput): Promise<Comment | null> {
    const selectedComment = await this.prisma.comment.findUnique({ where: commentWhereUniqueInput, include: { post: true } })

    if (!selectedComment) throw new NotFoundException('Comment not found!')

    return selectedComment
  }

  async create(createCommentInput: CreateCommentInput): Promise<Comment | BadRequestException> {
    const validPostId = await this.prisma.post.findUnique({ where: { id: createCommentInput.postId} })

    if (!validPostId) throw new BadRequestException('Post ID is not valid')

    return this.prisma.comment.create({ data: createCommentInput, include: { post: true } })
  }

  async update(id: number, updateCommentInput: UpdateCommentInput): Promise<Comment | BadRequestException> {
    try {
      return await this.prisma.comment.update({ where: { id: id }, data: updateCommentInput, include: { post: true } })
    } catch (err) {
      throw new BadRequestException('Comment ID is not valid!.')
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.comment.delete({ where: { id: id } })
    } catch (err) {
      throw new BadRequestException('Comment ID is not valid', { cause: new Error(), description: err })
    }
  }

}
