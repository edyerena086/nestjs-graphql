import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand, Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma.service'

import { CreateBrandInput, UpdateBrandInput } from './dto/create-brand.input'

@Injectable()
export class BrandService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.prisma.brand.findMany()
  }

  async findOne(id: Prisma.BrandWhereUniqueInput): Promise<Brand | null> {
    const getBrand = await this.prisma.brand.findUnique({ where: id })

    if (!getBrand) throw new NotFoundException('Brand not found!')

    return getBrand
  }

  async create(createBrandInput: CreateBrandInput) {
    return await this.prisma.brand.create({ data: createBrandInput })
  }

  async update(id: number, updateBrandInput: UpdateBrandInput) {
    return await this.prisma.brand.update({ where: { id: id}, data: updateBrandInput })
  }

  async remove(id: number) {
    return await this.prisma.brand.delete({ where: { id: id } })
  }

}
