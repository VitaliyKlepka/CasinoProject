import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  public async getAccountById(id: number): Promise<any> {
    return this.accountRepository.findOne({ where: { id } });
  }

  public async getAccountByEmail(email: string): Promise<any> {
    return this.accountRepository.findOne({ where: { email } });
  }

  public async createAccount(email: string): Promise<any> {
    return this.accountRepository.save({ email });
  }
}
