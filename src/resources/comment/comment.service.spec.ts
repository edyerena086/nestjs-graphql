import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { CommentService } from './comment.service';

// Lets mock prisma
const prismaMock = {
  comment: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  post: {
    findUnique: jest.fn(),
  }
}

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: PrismaService,
          useValue: prismaMock
        }
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);

     // let's clear mocked function
     prismaMock.comment.findMany.mockClear()
     prismaMock.comment.findUnique.mockClear()
     prismaMock.comment.create.mockClear()
     prismaMock.comment.update.mockClear()
 
     prismaMock.post.findUnique.mockClear()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get all comments', () => {
    it('should get all the comments', async () => {
      // Arrange
      const comments = [{
        id: 1,
        author: 'Joel Goodman',
        comment: 'This is a comment!'
      }]
  
      jest.spyOn(prismaMock.comment, 'findMany').mockReturnValue(comments)
  
      // Act
      const serviceGetComments = await service.findAll()
  
      // Assert
      expect(prismaMock.comment.findMany).toHaveBeenCalledTimes(1)
      expect(serviceGetComments).toEqual(comments)
    })

    it('should get an empty array of comments', async () => {
      //Arrenge
      const comments = []

      jest.spyOn(prismaMock.comment, 'findMany').mockReturnValue(comments)

      // Act
      const emptyComments = await service.findAll()

      // Assert
      expect(prismaMock.comment.findMany).toHaveBeenCalledTimes(1)
      expect(emptyComments).toEqual(comments)
    })
  })

  describe('comments by id', () => {
    it('get a comment by id', async () => {
      // Arrenge
      const mockCommentData = {
        id: 1,
        author: 'Joel Garret',
        comment: 'This is just a comment',
        postId: 1
      }

      jest.spyOn(prismaMock.comment, 'findUnique').mockReturnValue(mockCommentData)

      // Act
      const getComment = await service.findOne({ id: mockCommentData.id })

      // Arrange
      expect(prismaMock.comment.findUnique).toHaveBeenCalledTimes(1)
      expect(prismaMock.comment.findUnique).toHaveBeenCalledWith({ where: { id: mockCommentData.id }, include: { post: true } })
      expect(getComment).toEqual(mockCommentData)
    })

    it('should not return a comment with an inavlid Comment ID', async () => {
      //Arrenge
      const mockCommentData = {
        id: 1,
        author: 'Joel Garret',
        comment: 'This is just a comment',
        postId: 1
      }

      jest.spyOn(prismaMock.comment, 'findUnique').mockReturnValue(null)

      // Act
      //[...nothing]

      // Assert
      await expect(service.findOne({ id: 3 })).rejects.toThrow(NotFoundException)
    })
  })

  describe('create new comment', () => {
    // Mock data
    const createCommentInput = {
      author: 'Joel Goodman',
      comment: 'This is just a comment!',
      postId: 1
    }

    const createdComment = {
      id: 1,
      author: 'Joel Goodman',
      comment: 'This is just a comment!',
      postId: 1
    }
    const createdPost = {
      id: 1,
      title: 'Just a title',
      text: 'Just a text'
    }

    beforeEach(async () => {
      prismaMock.comment.findMany.mockClear()
      prismaMock.comment.findUnique.mockClear()
      prismaMock.comment.create.mockClear()
      prismaMock.comment.update.mockClear()
    })

    it('should create a new comment with a valid Post ID', async () => {
      // Arrenge
      jest.spyOn(prismaMock.comment, 'create').mockReturnValue(createdComment)
      jest.spyOn(prismaMock.post, 'findUnique').mockReturnValue(createdPost)

      // Act
      const newComment = await service.create(createCommentInput)

      // Assert
      expect(prismaMock.comment.create).toHaveBeenCalledTimes(1)
      expect(prismaMock.comment.create).toHaveBeenCalledWith({ data: createCommentInput, include: { post: true } })
      expect(createdComment).toEqual(newComment)
    })
  })

  describe('update a comment', () => {
    it('should update a comment', async () => {
      // Arrange
      const updateCommentInput = {
        id: 1,
        author: 'Jhon Wellner'
      }

      const mockUpdatedComment = {
        id: 2,
        author: 'Jhon Gonzalez',
        comment: 'This is just a comment',
        postId: 1,
      }

      jest.spyOn(prismaMock.comment, 'update').mockReturnValue(mockUpdatedComment)

      const updatedComment = await service.update(updateCommentInput.id, updateCommentInput)

      expect(prismaMock.comment.update).toHaveBeenCalledTimes(1)
      expect(prismaMock.comment.update).toHaveBeenCalledWith({ data: updateCommentInput, where: { id: updateCommentInput.id }, include: { post: true }})
      expect(updatedComment).toEqual(mockUpdatedComment)
    })
  })
});
