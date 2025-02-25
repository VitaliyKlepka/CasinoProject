import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_TEXT, JWT_EXPIRATION_TIME } from '../auth/constants';
import { FinancialModule } from 'src/financial/financial.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    FinancialModule,
    JwtModule.register({
      secret: JWT_SECRET_TEXT,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME },
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
