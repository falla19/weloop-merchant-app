import { View, Text, Button } from 'react-native';
import { clearToken } from '../../utils/tokenStorage';
import { useAuthStore } from '../../store/useAuthStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type AuthStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Dashboard'>;

export default function DashboardScreen({ navigation }: Props) {
  const setToken = useAuthStore((s) => s.setToken);

  const handleLogout = async () => {
    await clearToken();     // Clear from SecureStore
    setToken(null);         // Clear from Zustand
    navigation.replace('Login'); // Go to login, remove history
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>👋 Welcome, Merchant!</Text>

      {/* Replace with real data when merchant name is available */}
      <Text style={{ marginBottom: 40 }}>Your dashboard is under construction.</Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
