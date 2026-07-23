import { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Account } from '@/domain/models/account';
import { AccountCard } from '@/presentation/features/account/components/AccountCard';
import { useAccountsViewModel } from '@/presentation/features/account/viewmodels/useAccountsViewModel';

export default function AccountsView() {
    const { accounts, isLoading, error, loadAccounts } = useAccountsViewModel();

    useEffect(() => {
        loadAccounts('oscar123');
    }, [loadAccounts]);

    const renderItem = ({ item }: { item: Account }) => (
        <AccountCard account={item} />
    );

    if (isLoading && accounts.length === 0) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#58ACDD" />
                <Text style={styles.loadingText}>Cargando cuentas...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => loadAccounts('oscar123')}>
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis cuentas</Text>
            <FlatList
                data={accounts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => loadAccounts('oscar123')}
                        colors={['#58ACDD']}
                        tintColor="#58ACDD"
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F5F7FA',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: '#D32F2F',
        marginBottom: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    retryButton: {
        backgroundColor: '#58ACDD',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 16,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});
