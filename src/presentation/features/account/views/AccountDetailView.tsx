import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Account } from '@/domain/models/account';

export default function AccountDetailView() {
    const params = useLocalSearchParams();
    
    const account: Account = {
        id: params.id as string,
        number: params.number as string,
        type: params.type as string,
        balance: parseFloat(params.balance as string) || 0,
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Detalles de cuenta</Text>
                
                <View style={styles.row}>
                    <Text style={styles.label}>Tipo:</Text>
                    <Text style={styles.value}>{account.type}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Número completo:</Text>
                    <Text style={styles.value}>{account.number}</Text>
                </View>

                <View style={[styles.row, styles.lastRow]}>
                    <Text style={styles.label}>Saldo actual:</Text>
                    <Text style={styles.balanceValue}>
                        ${account.balance.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 24,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    label: {
        fontSize: 16,
        color: '#666666',
        fontWeight: '500',
    },
    value: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: 'bold',
    },
    balanceValue: {
        fontSize: 18,
        color: '#58ACDD',
        fontWeight: 'bold',
    }
});
