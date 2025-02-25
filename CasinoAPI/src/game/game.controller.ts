import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IsessionPayload } from 'src/auth/interfaces';
import { ISpinResults } from './interfaces';
import { FinancialService } from 'src/financial/financial.service';
import { MINIMAL_CREDITS_REQUIREMENT } from 'src/financial/constants';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly finStatService: FinancialService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/twist')
  public async getSpin(
    @Req() request: Request & IsessionPayload,
  ): Promise<ISpinResults> {
    const userSession = request.user;
    const finStats = await this.finStatService.getStatsForAccount(
      userSession.sub,
    );
    if (finStats.credits < MINIMAL_CREDITS_REQUIREMENT) {
      throw new HttpException('Insufficient Credits', HttpStatus.BAD_REQUEST);
    }
    const spin = await this.gameService.getSpin(finStats.credits);
    const updatedFinStats = await this.finStatService.updateCreditsForAccount(
      userSession.sub,
      finStats.credits + spin.spinCost,
    );
    if (!updatedFinStats.affected) {
      throw new HttpException(
        'Failed to update credits',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return spin;
  }
}
