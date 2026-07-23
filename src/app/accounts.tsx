import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AccountsView from '@/presentation/features/account/views/AccountsView';

export default function AccountsScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <AccountsView />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
});
