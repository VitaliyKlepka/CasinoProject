import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountService } from 'src/account/account.service';
import { IInitSessionResponse, IsessionPayload } from './interfaces';
import { InitAuthSessionDto } from './dto/init_auth_session.dto';
import { Request } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Post('init')
  async init(
    @Req() req: Request,
    @Body() initSessionDto: InitAuthSessionDto,
  ): Promise<IInitSessionResponse> {
    const deviceId = req.headers['x-did'] as string;
    if (!deviceId) {
      throw new HttpException('No DID found', HttpStatus.BAD_REQUEST);
    }
    const { email } = initSessionDto;
    let account = await this.accountService.getAccountByEmail(email);
    if (!account) {
      account = await this.accountService.createAccount(email);
    }
    console.log('ACCOUNT_INIT', account);

    return this.authService.init(account, deviceId);
  }

  @UseGuards(AuthGuard)
  @Post('close')
  async closeSession(@Req() req: Request & IsessionPayload): Promise<boolean> {
    const userSession = req.user;

    const closingStatus = await this.authService.closeSession(userSession.did);
    if (!closingStatus) {
      throw new HttpException(
        'Failed to close session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return closingStatus;
  }
}
