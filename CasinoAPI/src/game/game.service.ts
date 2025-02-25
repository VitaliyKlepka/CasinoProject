import { Injectable } from '@nestjs/common';
import { ISpinResults } from './interfaces';
import { ESpinSymbol } from './enums';
import { CREDITS_FIRST_THRESHOLD, CREDITS_SECOND_THRESHOLD } from './constants';
import { getRewardByType } from './helpers';

@Injectable()
export class GameService {
  private readonly symbols = [
    ESpinSymbol.CHERRY,
    ESpinSymbol.LEMON,
    ESpinSymbol.LEMON,
    ESpinSymbol.WATERMELON,
  ];

  constructor() {}

  private randomSymbol(): ESpinSymbol {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  private generateRoll(): ESpinSymbol[] {
    return [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()];
  }

  private isWinning(roll: ESpinSymbol[]): boolean {
    return roll[0] === roll[1] && roll[1] === roll[2];
  }

  public async getSpin(credits: number): Promise<ISpinResults> {
    let roll = this.generateRoll();
    if (this.isWinning(roll)) {
      let cheatChance = 0;

      if (
        credits >= CREDITS_FIRST_THRESHOLD &&
        credits <= CREDITS_SECOND_THRESHOLD
      ) {
        cheatChance = 0.3;
      } else if (credits > CREDITS_SECOND_THRESHOLD) {
        cheatChance = 0.6;
      }

      if (cheatChance > 0 && Math.random() < cheatChance) {
        console.log('System Cheeting: Repeat Roll');
        roll = this.generateRoll();
      }
    }

    const spinCost = this.isWinning(roll) ? getRewardByType(roll[0]) : -1;

    return {
      pointOne: roll[0],
      pointTwo: roll[1],
      pointThree: roll[2],
      spinCost,
    };
  }
}
