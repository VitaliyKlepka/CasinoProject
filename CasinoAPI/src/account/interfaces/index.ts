import { IFinancialStatistic } from "src/financial/interfaces";

export interface IAccount {
    id: number;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface IAccountResponse {
  account: IAccount;
  stats: IFinancialStatistic;
}
