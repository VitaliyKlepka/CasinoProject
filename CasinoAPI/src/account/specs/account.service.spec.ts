import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../account.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Repository } from 'typeorm';

describe('AccountService', () => {
  let service: AccountService;
  let repository: Repository<Account>;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get<Repository<Account>>(getRepositoryToken(Account));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAccountById', () => {
    it('should return an account by id', async () => {
      const mockAccount = { id: 1, email: 'test@test.com' };
      mockRepository.findOne.mockResolvedValue(mockAccount);

      const result = await service.getAccountById(1);

      expect(result).toEqual(mockAccount);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('getAccountByEmail', () => {
    it('should return an account by email', async () => {
      const mockAccount = { id: 1, email: 'test@test.com' };
      mockRepository.findOne.mockResolvedValue(mockAccount);

      const result = await service.getAccountByEmail('test@test.com');

      expect(result).toEqual(mockAccount);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
      });
    });
  });

  describe('createAccount', () => {
    it('should create and return a new account', async () => {
      const mockAccount = { id: 1, email: 'test@test.com' };
      mockRepository.save.mockResolvedValue(mockAccount);

      const result = await service.createAccount('test@test.com');

      expect(result).toEqual(mockAccount);
      expect(mockRepository.save).toHaveBeenCalledWith({
        email: 'test@test.com',
      });
    });
  });
});
