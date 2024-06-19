import React from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator, useTheme, Title } from 'react-native-paper';
import { useAuth } from '../app/context/AuthContext';
import { useForm, Controller, FieldValues } from 'react-hook-form';

const randomImageURI = 'https://picsum.photos/id/532/3820/2762';

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [loading, setLoading] = React.useState(false);
  const { onLogin } = useAuth();
  const theme = useTheme();

  const onSubmit = async (data: LoginFormInputs) => {
    const { username, password } = data;
    setLoading(true);
    const result = await onLogin(username, password);
    setLoading(false);
    if (result && result.error) {
      Alert.alert('Login Error', result.msg);
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: randomImageURI }} style={styles.image} />
      <Title style={styles.title}>Login</Title>
      <View style={styles.form}>
        <Controller
          control={control}
          name="username"
          rules={{ required: 'Username is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Username"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="none"
              style={styles.input}
              error={!!errors.username}
            />
          )}
        />
        {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Password"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              style={styles.input}
              error={!!errors.password}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
            Login
          </Button>
        )}
      </View>
      <Text style={styles.registerText}>
        Don't have an account?{' '}
        <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    marginTop: 12,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 20,
    borderRadius: 80,
    resizeMode: 'cover',
    borderColor: '#000',
    borderWidth: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  registerText: {
    marginTop: 16,
    color: '#666',
  },
  link: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
