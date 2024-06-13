import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator, useTheme, Title } from 'react-native-paper';
import { useAuth } from '../app/context/AuthContext';

const randomImageURI = 'https://picsum.photos/id/5/5000/3334';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { onRegister, authState } = useAuth();
  const theme = useTheme();

  const register = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Error', 'Username and Password cannot be empty.');
      return;
    }
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
          <Button mode="contained" onPress={register} style={styles.button}>
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
});

export default Register;
