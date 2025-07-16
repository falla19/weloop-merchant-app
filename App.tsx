import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/LoginScreen';
import DashboardScreen from './src/screens/dashboard/DashboardScreen'; // placeholder
import { getToken } from './src/utils/tokenStorage';
import { useAuthStore } from './src/store/useAuthStore';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const setToken = useAuthStore((s) => s.setToken);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    getToken().then((token) => {
      if (token) setToken(token);
      setLoading(false);
    });
  }, []);

  if (loading) return null; // splash screen or loader

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
