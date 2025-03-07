import { Injectable } from '@nestjs/common';
import { IInitSessionResponse } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/account/entities/account.entity';
import { AuthSession } from './entities/auth_session.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLoggerService } from 'src/logger/appLogger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: AppLoggerService,
    private readonly jwtService: JwtService,
    @InjectRepository(AuthSession)
    private readonly authSessionRepository: Repository<AuthSession>,
  ) {}

  public async init(
    account: Account,
    deviceId: string,
  ): Promise<IInitSessionResponse> {
    const existingSession = await this.authSessionRepository.findOne({
      where: {
        deviceId,
        accountId: account.id,
        expires_at: MoreThan(new Date()),
      },
    });
    if (existingSession) {
      return { token: existingSession.payload };
    }

    const authSessionPayload = {
      accountId: account.id,
      deviceId,
      payload: await this.jwtService.signAsync({
        sub: account.id,
        email: account.email,
        did: deviceId,
      }),
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day
    };

    const authSession =
      await this.authSessionRepository.save(authSessionPayload);

    return { token: authSession.payload };
  }

  public async closeSession(deviceId: string): Promise<boolean> {
    const session = await this.authSessionRepository.findOne({
      where: { deviceId, expires_at: MoreThan(new Date()) },
    });
    if (!session) {
      this.logger.warn('[AUTH]::[CLOSE_SESSION]::Session not found', { deviceId });
      return false;
    }
    const updateResult = await this.authSessionRepository.update(session.id, {
      expires_at: new Date(),
    });
    const result = updateResult.affected ? updateResult.affected > 0 : false;
    this.logger.log('[AUTH]::[CLOSE_SESSION]::[SUCCESS]::', { result, sessionId: session.id });
    return result;
  }
}
