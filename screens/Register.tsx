import React from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator, useTheme, Title } from 'react-native-paper';
import { useAuth } from '../app/context/AuthContext';
import { useForm, Controller } from 'react-hook-form';

const randomImageURI = 'https://picsum.photos/id/5/5000/3334';

interface RegisterFormInputs {
  username: string;
  password: string;
}

const Register = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [loading, setLoading] = React.useState(false);
  const { onRegister, authState } = useAuth();
  const theme = useTheme();

  const onSubmit = async (data: RegisterFormInputs) => {
    const { username, password } = data;
    setLoading(true);
    const result = await onRegister(username, password);
    setLoading(false);
    if (result && result.error) {
      Alert.alert('Registration Error', result.msg);
    } else {
      if (authState.authenticated) {
        navigation.navigate('Home');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: randomImageURI }} style={styles.image} />
      <Title style={styles.title}>Create an Account</Title>
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
            Register
          </Button>
        )}
      </View>
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
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
  loginText: {
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

export default Register;
