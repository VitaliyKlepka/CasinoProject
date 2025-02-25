import { Test, TestingModule } from '@nestjs/testing';
import { FinancialService } from '../financial.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FinancialStatistic } from '../entities/fin_stat.entity';
import { Repository } from 'typeorm';
import { DEFAULT_CREDITS_ASSIGNMENT } from '../constants';

describe('FinancialService', () => {
  let service: FinancialService;
  let repository: Repository<FinancialStatistic>;

  const mockRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinancialService,
        {
          provide: getRepositoryToken(FinancialStatistic),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FinancialService>(FinancialService);
    repository = module.get<Repository<FinancialStatistic>>(
      getRepositoryToken(FinancialStatistic),
    );
  });

  describe('getStatsForAccount', () => {
    it('should return existing stats', async () => {
      const mockStats = { accountId: 1, credits: 100 };
      mockRepository.findOneBy.mockResolvedValue(mockStats);

      const result = await service.getStatsForAccount(1);

      expect(result).toEqual(mockStats);
    });

    it('should create new stats if none exist', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      const newStats = { accountId: 1, credits: DEFAULT_CREDITS_ASSIGNMENT };
      mockRepository.save.mockResolvedValue(newStats);

      const result = await service.getStatsForAccount(1);

      expect(result).toEqual(newStats);
      expect(mockRepository.save).toHaveBeenCalledWith(newStats);
    });
  });

  describe('updateCreditsForAccount', () => {
    it('should update credits successfully', async () => {
      const mockUpdateResult = { affected: 1 };
      mockRepository.update.mockResolvedValue(mockUpdateResult);

      const result = await service.updateCreditsForAccount(1, 150);

      expect(result).toEqual(mockUpdateResult);
      expect(mockRepository.update).toHaveBeenCalledWith(
        { accountId: 1 },
        { credits: 150 },
      );
    });
  });

  describe('cashOutForAccount', () => {
    it('should process cashout successfully', async () => {
      const mockStats = {
        accountId: 1,
        credits: 1000,
        ballance: 0,
      };
      mockRepository.findOneBy.mockResolvedValue(mockStats);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.cashOutForAccount(1);

      expect(result).toBeDefined();
      expect(result!.credits).toBeLessThan(mockStats.credits);
      expect(result!.ballance).toBeGreaterThan(mockStats.ballance);
    });

    it('should return null when no credits available for withdrawal', async () => {
      const mockStats = {
        accountId: 1,
        credits: 0,
        ballance: 0,
      };
      mockRepository.findOneBy.mockResolvedValue(mockStats);

      const result = await service.cashOutForAccount(1);

      expect(result).toBeNull();
    });

    it('should return null when account not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.cashOutForAccount(1);

      expect(result).toBeNull();
    });
  });
});
