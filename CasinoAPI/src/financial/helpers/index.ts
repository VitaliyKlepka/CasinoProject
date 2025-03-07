import { DEFAULT_CREDITS_ASSIGNMENT } from '../constants';

export const getCreditsAvailable = (credits: number = 0) => {
  if (credits < DEFAULT_CREDITS_ASSIGNMENT) {
    return 0;
  }
  return credits - DEFAULT_CREDITS_ASSIGNMENT;
};

export const getCashToDeposit = (cash: number = 0) => {
  if (cash > 0) {
    if (cash > 10) {
      return 10;
    }
    return cash;
  }
  return 0;
};
