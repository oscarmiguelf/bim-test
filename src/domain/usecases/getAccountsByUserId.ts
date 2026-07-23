import { Account } from '@/domain/models/account';
import { IAccountsRepository } from '../repositories/accountsRepository';
import { Result, failure } from '@/core/utils/result';

export class GetAccountsByUserUseCase {
    private readonly accountsRepository: IAccountsRepository;

    constructor(accountsRepository: IAccountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    async execute(userId: string, signal?: AbortSignal): Promise<Result<Account[]>> {
        if (!userId) {
            return failure("El userId es requerido para obtener las cuentas.");
        }

        return await this.accountsRepository.getAccountsByUserId(userId, signal);
    }
}
