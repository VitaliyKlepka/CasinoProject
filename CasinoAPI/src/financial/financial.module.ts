import { Module } from '@nestjs/common';
import { FinancialStatistic } from './entities/fin_stat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialService } from './financial.service';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialStatistic])],
  providers: [FinancialService],
  exports: [FinancialService],
})
export class FinancialModule {}
