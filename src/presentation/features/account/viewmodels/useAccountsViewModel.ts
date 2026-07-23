import { useState, useCallback, useRef } from 'react';
import { Account } from '@/domain/models/account';
import { useDependencies } from '@/core/di/DependenciesProvider';

export const useAccountsViewModel = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const { getAccountsByUserUseCase } = useDependencies();

    const loadAccounts = useCallback(async (userId: string) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setIsLoading(true);
        setError(null);

        try {
            const result = await getAccountsByUserUseCase.execute(userId, abortController.signal);
            
            if (result.isSuccess && result.data) {
                setAccounts(result.data);
            } else {
                setError(result.error || 'Error desconocido al cargar las cuentas');
            }
        } catch (err) {
            if (err instanceof Error && err.message === 'AbortError') {
                return;
            }
            
            setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado');
        } finally {
            if (abortControllerRef.current === abortController) {
                setIsLoading(false);
                abortControllerRef.current = null;
            }
        }
    }, [getAccountsByUserUseCase]);

    return {
        accounts,
        isLoading,
        error,
        loadAccounts
    };
};
