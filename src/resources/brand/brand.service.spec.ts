import { Test, TestingModule } from '@nestjs/testing';
import { BrandService } from './brand.service';

import { PrismaService } from '../../prisma.service'

describe('BrandService', () => {
  let service: BrandService;
  let prismaMock = {
    brand: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }

  const mockNewBrand = {
    name: 'Car Brand'
  }

  const mockCreatedBrand = {
    id: 1,
    ...mockNewBrand
  }

  const mockUpdadedBrand = {
    ...mockCreatedBrand,
    name: 'Car Brand updated'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandService, {
        provide: PrismaService,
        useValue: prismaMock
      }],
    }).compile();

    service = module.get<BrandService>(BrandService);
  });

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all the brands', async () => {
      // Arrenge
      jest.spyOn(prismaMock.brand, 'findMany').mockReturnValue([mockCreatedBrand])

      // Act
      const getAllBrands = await service.findAll()

      // Assert
      expect(prismaMock.brand.findMany).toHaveBeenCalledTimes(1)
      expect(getAllBrands).toEqual([mockCreatedBrand])
    })

    it('should get an empty array of brands', async () => {
      // Arrenge
      jest.spyOn(prismaMock.brand, 'findMany').mockReturnValue([])

      // Act
      const getAllBrands = await service.findAll()

      // Assert
      expect(prismaMock.brand.findMany).toHaveBeenCalledTimes(1)
      expect(getAllBrands).toEqual([])
    })
  })

  /*describe('create brand', () => {
    it('should create a new car brand', async () => {
      // Arrange
      jest.spyOn(prismaMock.brand, 'create').mockReturnValue(mockCreatedBrand)

      // Act
      const newBrand = await service.create(mockNewBrand)

      // Assert
      expect(prismaMock.brand.create).toHaveBeenCalledTimes(1)
      expect(prismaMock.brand.create).toHaveBeenCalledWith({ data: mockNewBrand })
      expect(newBrand).toEqual(mockCreatedBrand)
    })
  })*/

  describe('update brand', () => {
    it('should update an existing brand', async () => {
      // Arrange
      jest.spyOn(prismaMock.brand, 'update').mockReturnValue(mockUpdadedBrand)

      // Act
      const updatedBrand = await service.update(1,  mockUpdadedBrand)

      // Assert
      expect(prismaMock.brand.update).toHaveBeenCalledTimes(1)
      expect(updatedBrand).toEqual(mockUpdadedBrand)
    })
  })
});
