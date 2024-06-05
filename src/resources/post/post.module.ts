import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

// import other modules
import { CommentModule } from '../comment/comment.module'

// Import prisma service
import { PrismaService } from '../../prisma.service'

@Module({
  imports: [forwardRef(() => CommentModule)],
  providers: [PostResolver, PostService, PrismaService],
})
export class PostModule {}
