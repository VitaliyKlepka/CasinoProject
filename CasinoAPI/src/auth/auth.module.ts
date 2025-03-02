import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from '../account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthSession } from './entities/auth_session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_SECRET_TEXT, JWT_EXPIRATION_TIME } from './constants';
import { AppLoggerModule } from 'src/logger/appLogger.module';

@Module({
  imports: [
    AppLoggerModule,
    AccountModule,
    TypeOrmModule.forFeature([AuthSession]),
    JwtModule.register({
      secret: JWT_SECRET_TEXT,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
