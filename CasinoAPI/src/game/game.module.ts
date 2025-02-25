import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_TEXT, JWT_EXPIRATION_TIME } from 'src/auth/constants';
import { FinancialModule } from 'src/financial/financial.module';

@Module({
  imports: [
    FinancialModule,
    JwtModule.register({
      secret: JWT_SECRET_TEXT,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME },
    }),
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
