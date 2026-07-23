import { Account } from '@/domain/models/account';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface AccountCardProps {
    account: Account;
}

export const AccountCard = ({ account }: AccountCardProps) => {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: '/account/[id]',
            params: {
                id: account.id,
                number: account.number,
                type: account.type,
                balance: account.balance.toString(),
            }
        });
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
            <Text style={styles.accountType}>{account.type}</Text>
            <Text style={styles.accountNumber}>**** {account.number.slice(-4)}</Text>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Saldo disponible</Text>
                <Text style={styles.balanceAmount}>
                    ${account.balance.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    accountType: {
        fontSize: 16,
        color: '#666666',
        fontWeight: '500',
        marginBottom: 4,
    },
    accountNumber: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    balanceContainer: {
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        paddingTop: 16,
    },
    balanceLabel: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 4,
    },
    balanceAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#58ACDD',
    },
});
