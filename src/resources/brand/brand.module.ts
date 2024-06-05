import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandResolver } from './brand.resolver';

import { PrismaService } from '../../prisma.service'

@Module({
  providers: [BrandResolver, BrandService, PrismaService],
})
export class BrandModule {}
