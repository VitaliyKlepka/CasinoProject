import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialStatistic } from './entities/fin_stat.entity';
import { Repository, UpdateResult } from 'typeorm';
import { IFinancialStatistic } from './interfaces';
import { DEFAULT_CREDITS_ASSIGNMENT } from './constants';
import { getCreditsAvailable } from './helpers';

@Injectable()
export class FinancialService {
  constructor(
    @InjectRepository(FinancialStatistic)
    private readonly financialStatisticRepository: Repository<FinancialStatistic>,
  ) {}

  public async getStatsForAccount(
    accountId: number,
  ): Promise<IFinancialStatistic> {
    const finStats = await this.financialStatisticRepository.findOneBy({
      accountId,
    });

    if (!finStats) {
      return this.financialStatisticRepository.save({
        accountId,
        credits: DEFAULT_CREDITS_ASSIGNMENT,
      });
    }

    return finStats;
  }

  public async updateCreditsForAccount(
    accountId: number,
    credits: number,
  ): Promise<UpdateResult> {
    return this.financialStatisticRepository.update({ accountId }, { credits });
  }

  public async cashOutForAccount(
    accountId: number,
  ): Promise<IFinancialStatistic | null> {
    const finStats = await this.financialStatisticRepository.findOneBy({
      accountId,
    });
    if (finStats) {
      const creditsToWithdraw = getCreditsAvailable(finStats.credits);
      if (creditsToWithdraw === 0) {
        return null;
      }
      const newStats = {
        credits: finStats.credits - creditsToWithdraw,
        ballance: finStats.ballance + creditsToWithdraw,
      };
      // Can be replaced with a logic for transaction to PaymentGateway
      const updateResult = await this.financialStatisticRepository.update(
        { accountId },
        newStats,
      );

      return updateResult.affected ? { ...finStats, ...newStats } : null;
    }

    return null;
  }
}
