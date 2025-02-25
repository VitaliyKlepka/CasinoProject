import { REWARDS_BY_SYMBOL } from '../constants';
import { ESpinSymbol } from '../enums';

// Need for default value for symbols that are not included in the REWARDS_BY_SYMBOL
export const getRewardByType = (symbol: ESpinSymbol): number => {
  switch (symbol) {
    case ESpinSymbol.CHERRY:
      return REWARDS_BY_SYMBOL[ESpinSymbol.CHERRY];
    case ESpinSymbol.LEMON:
      return REWARDS_BY_SYMBOL[ESpinSymbol.LEMON];
    case ESpinSymbol.ORANGE:
      return REWARDS_BY_SYMBOL[ESpinSymbol.ORANGE];
    case ESpinSymbol.WATERMELON:
      return REWARDS_BY_SYMBOL[ESpinSymbol.WATERMELON];
    default:
      return 0;
  }
};
