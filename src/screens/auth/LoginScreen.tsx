import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../store/useAuthStore';
import { saveToken } from '../../utils/tokenStorage';
import { login } from '../../services/auth.service';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type AuthStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormInput = z.infer<typeof loginSchema>;

export default function LoginScreen({ navigation }: Props) {
  const setToken = useAuthStore((s) => s.setToken);

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  React.useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const token = await login(data.email, data.password);
      await saveToken(token);
      setToken(token);
      navigation.replace('Dashboard');
    } catch {
      Alert.alert('Login failed', 'Invalid credentials');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text>Email</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setValue('email', text)}
      />
      {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

      <Text>Password</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
        secureTextEntry
        onChangeText={(text) => setValue('password', text)}
      />
      {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
