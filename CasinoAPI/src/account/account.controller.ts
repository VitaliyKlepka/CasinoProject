import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { IsessionPayload } from 'src/auth/interfaces';
import { FinancialService } from 'src/financial/financial.service';
import { AppLoggerService } from 'src/logger/appLogger.service';
import { IAccountResponse } from './interfaces';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accService: AccountService,
    private readonly financialService: FinancialService,
    private readonly logger: AppLoggerService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  public async getAccount(@Req() req: Request & IsessionPayload) : Promise<IAccountResponse> {
    const userSession = req.user;

    const account = await this.accService.getAccountById(
      userSession.sub as number,
    );
    const stats = await this.financialService.getStatsForAccount(
      userSession.sub as number,
    );

    return { account, stats };
  }

  @UseGuards(AuthGuard)
  @Post('cash-out')
  public async cashOut(@Req() req: Request & IsessionPayload) : Promise<IAccountResponse> {
    const userSession = req.user;

    const account = await this.accService.getAccountById(userSession.sub as number);
    if (!account) {
      throw new HttpException('No active account found', HttpStatus.NOT_FOUND);
    }
    const stats = await this.financialService.cashOutForAccount(account?.id);
    if (!stats) {
      throw new HttpException('Failed to cash out', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.logger.log('[ACCOUNT]::[CASH_OUT]::', { userId: userSession.sub, sessionId: userSession.id, newStats: stats });

    return { account, stats };
  }

  @UseGuards(AuthGuard)
  @Post('deposit')
  public async deposit(@Req() req: Request & IsessionPayload) : Promise<IAccountResponse> {
    const userSession = req.user;

    const account = await this.accService.getAccountById(userSession.sub as number);
    if (!account) {
      throw new HttpException('No active account found', HttpStatus.NOT_FOUND);
    }
    const stats = await this.financialService.depositForAccount(account?.id);
    if (!stats) {
      throw new HttpException('Failed to deposit account', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    this.logger.log('[ACCOUNT]::[DEPOSITED]::', { userId: userSession.sub, sessionId: userSession.id, newStats: stats });

    return { account, stats };
  }

}
