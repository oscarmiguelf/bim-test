import { Stack } from 'expo-router';

export function AppNavigator() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: 'Inicio' }} />
            <Stack.Screen name="accounts" options={{ title: 'Mis cuentas' }} />
            <Stack.Screen name="account/[id]" options={{ title: 'Detalle de cuenta' }} />
        </Stack>
    );
}
