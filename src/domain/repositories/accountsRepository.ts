import { failure, Result, success } from '@/core/utils/result';
import { Account } from '@/domain/models/account';

export interface IAccountsRepository {
    getAccountsByUserId(userId: string, signal?: AbortSignal): Promise<Result<Account[]>>;
}

export const MOCK_ACCOUNTS: Account[] = [
    {
        id: '1',
        number: '1234567890',
        type: 'Cuenta Débito',
        balance: 24580.30,
    },
    {
        id: '2',
        number: '9988776655',
        type: 'Cuenta Ahorro',
        balance: 1200.50,
    },
    {
        id: '3',
        number: '41412412421412',
        type: 'Cuenta Ahorro 2',
        balance: 1200.50,
    },
];

export class AccountsRepository implements IAccountsRepository {
    async getAccountsByUserId(userId: string, signal?: AbortSignal): Promise<Result<Account[]>> {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                if (signal?.aborted) {
                    return reject(new Error('AbortError'));
                }

                const shouldFail = Math.random() < 0.5;

                if (shouldFail) {
                    resolve(failure('Error de conexión al obtener las cuentas. Intenta de nuevo.'));
                } else {
                    resolve(success(MOCK_ACCOUNTS));
                }
            }, 1500);

            if (signal) {
                signal.addEventListener('abort', () => {
                    clearTimeout(timeoutId);
                    reject(new Error('AbortError'));
                });
            }
        });
    }
}
