import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';

import { PrismaService } from '../../prisma.service'

describe('CarService', () => {
  let service: CarService;

  const prismaMock = {
    car: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }

  const mockNeCarData = {
    name: 'Yaris',
    description: 'This is a beautiful car!',
    brandId: 1
  }

  const mockCreatedCarData = {
    id: 1,
    ...mockNeCarData
  }

  const mockUpdadedCarData = {
    ...mockCreatedCarData,
    name: 'Yaris updated'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarService, {
        provide: PrismaService,
        useValue: prismaMock
      }],
    }).compile();

    service = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*it('should create a new car model', async () => {
    // Arrange
    jest.spyOn(prismaMock.car, 'create').mockReturnValue(mockCreatedCarData)

    // Act
    const newCar = await service.create(mockNeCarData)

    // Assert
    expect(prismaMock.car.create).toHaveBeenCalledTimes(1)
    expect(prismaMock.car.create).toHaveBeenCalledWith({ data: mockNeCarData, include: { brand: true } })
    expect(newCar).toEqual(mockCreatedCarData)
  })*/

  /*it('should update a car', async () => {
    // Arrange
    const carData = {
      id: 1,
      name: 'Yaris updated'
    }
    jest.spyOn(prismaMock.car, 'update').mockReturnValue(mockUpdadedCarData)

    // Act
    const updatedCar = await service.update(carData.id, carData)

    // Assert
    expect(prismaMock.car.update).toHaveBeenCalledTimes(1)
    expect(updatedCar).toEqual(mockUpdadedCarData)
  })*/
});
