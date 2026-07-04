import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button, BrandLogo } from '@/components';
import { FirebaseSetupBanner } from '@/components/FirebaseSetupBanner';
import { loginSchema } from '@/schemas';
import { useAuth } from '@/hooks/useAuth';
import { isFirebaseConfigured } from '@/services/firebase/app';

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async () => {
    if (!isFirebaseConfigured()) {
      Alert.alert(t('common.error'), t('errors.firebaseNotConfigured'));
      return;
    }

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[String(e.path[0])] = t('common.required');
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setErrors({});
      await login({ email, password });
      router.replace('/(tabs)');
    } catch {
      Alert.alert(t('common.error'), t('auth.loginError'));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FirebaseSetupBanner />
          <View className="mb-10 items-center">
            <BrandLogo size="auth" className="mb-6" />
            <Text className="text-center text-3xl font-bold text-text">
              {t('auth.welcomeTitle')}
            </Text>
            <Text className="mt-3 max-w-xs text-center text-base leading-6 text-muted">
              {t('auth.welcomeSubtitle')}
            </Text>
          </View>

          <Input
            label={t('auth.email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
          />
          <Input
            label={t('auth.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

          <Link href="/(auth)/forgot-password" asChild>
            <Text className="mb-6 text-right text-sm font-semibold text-primary">
              {t('auth.forgotPassword')}
            </Text>
          </Link>

          <Button title={t('auth.login')} onPress={handleLogin} loading={isLoggingIn} />

          <View className="mt-8 flex-row justify-center">
            <Text className="text-muted">{t('auth.noAccount')} </Text>
            <Link href="/(auth)/register">
              <Text className="font-bold text-primary">{t('auth.register')}</Text>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
