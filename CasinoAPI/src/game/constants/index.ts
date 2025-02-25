import { ESpinSymbol } from '../enums';

export const CREDITS_FIRST_THRESHOLD = 40;
export const CREDITS_SECOND_THRESHOLD = 60;

export const REWARDS_BY_SYMBOL: Record<ESpinSymbol, number> = {
  [ESpinSymbol.CHERRY]: 10,
  [ESpinSymbol.LEMON]: 20,
  [ESpinSymbol.ORANGE]: 30,
  [ESpinSymbol.WATERMELON]: 40,
};
