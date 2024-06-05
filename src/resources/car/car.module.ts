import { Module, forwardRef } from '@nestjs/common';
import { CarService } from './car.service';
import { CarResolver } from './car.resolver';

import { BrandModule } from '../brand/brand.module'
import { PrismaService } from '../../prisma.service'

@Module({
  imports: [forwardRef(() => BrandModule)],
  providers: [CarResolver, CarService, PrismaService],
})
export class CarModule {}
