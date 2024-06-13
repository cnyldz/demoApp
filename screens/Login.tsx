import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator, useTheme, Title } from 'react-native-paper';
import { useAuth } from '../app/context/AuthContext';

const randomImageURI = 'https://picsum.photos/id/532/3820/2762';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();
  const theme = useTheme();

  const login = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Error', 'Username and Password cannot be empty.');
      return;
    }
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
        <TextInput
          mode="outlined"
          label="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <Button mode="contained" onPress={login} style={styles.button}>
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
});

export default Login;
