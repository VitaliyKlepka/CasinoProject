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

@Controller('account')
export class AccountController {
  constructor(
    private readonly accService: AccountService,
    private readonly financialService: FinancialService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  public async getAccount(@Req() req: Request & IsessionPayload) {
    const userSession = req.user;
    if (!userSession) {
      throw new HttpException('No user found', HttpStatus.BAD_REQUEST);
    }
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
  public async cashOut(@Req() req: Request & IsessionPayload) {
    const user = req.user;
    if (!user) {
      throw new HttpException('No user found', HttpStatus.BAD_REQUEST);
    }
    const account = await this.accService.getAccountById(user.id);
    const stats = await this.financialService.cashOutForAccount(account?.id);
    return { account, stats };
  }
}
