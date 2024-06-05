import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car, Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma.service'

import { CreateCarInput, UpdateCarInput } from './dto/create-car.input'

@Injectable()
export class CarService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async findAll(): Promise<Car[]> {
    return this.prisma.car.findMany({ include: { brand: true } })
  }

  async findOne(id: Prisma.CarWhereUniqueInput): Promise<Car> {
    const getCar = await this.prisma.car.findUnique({ where: id })

    if (!getCar) throw new NotFoundException('Car not found!')

    return getCar
  }

  async create(createCarInput: CreateCarInput) {
    return await this.prisma.car.create({ data: createCarInput, include: { brand: true } })
  }

  async update(id: number, updateCarInput: UpdateCarInput) {
    try {
      return await this.prisma.car.update({ where: { id: id }, data: updateCarInput, include: { brand: true } })
    } catch (err) {
      throw new BadRequestException('Car ID is not validd!')
    }
  }

  async remove(id: number) {
    return await this.prisma.car.delete({ where: { id: id } })
  }
}
