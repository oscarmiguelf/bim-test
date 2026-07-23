
import { AccountsRepository } from '@/domain/repositories/accountsRepository';
import { GetAccountsByUserUseCase } from '@/domain/usecases/getAccountsByUserId';
import React, { createContext, useContext, useMemo } from 'react';

interface Dependencies {
    getAccountsByUserUseCase: GetAccountsByUserUseCase;
}

const DependenciesContext = createContext<Dependencies | null>(null);

export const DependenciesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dependencies = useMemo<Dependencies>(() => {
        const accountsRepository = new AccountsRepository();

        return {
            getAccountsByUserUseCase: new GetAccountsByUserUseCase(accountsRepository),
        };
    }, []);

    return (
        <DependenciesContext.Provider value={dependencies}>
            {children}
        </DependenciesContext.Provider>
    );
};

export const useDependencies = (): Dependencies => {
    const context = useContext(DependenciesContext);
    if (!context) {
        throw new Error('useDependencies debe ser usado dentro de un DependenciesProvider');
    }
    return context;
};
