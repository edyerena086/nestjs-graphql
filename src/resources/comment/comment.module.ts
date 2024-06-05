import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { PrismaService } from '../../prisma.service'

// Import post module
import { PostModule } from '../post/post.module'

@Module({
  imports: [forwardRef(() => PostModule)],
  providers: [CommentResolver, CommentService, PrismaService],
})
export class CommentModule {}
