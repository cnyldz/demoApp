import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, ActivityIndicator, Text } from 'react-native-paper';
import { useAuth } from '../app/context/AuthContext';
import { fetchPosts, createPost, updatePost, deletePost } from '../app/context/api';
import { Post } from '/Users/heavyshark/demoApp/types/post';

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { onLogout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostBody, setNewPostBody] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={onLogout} mode="text">Logout</Button>
      ),
    });
    loadPosts();
  }, [navigation]);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(data);
      console.log('Fetched posts:', data);
    } catch (err: any) {
      setError(err.message);
      console.error('Error details:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (newPostTitle.trim() === '' || newPostBody.trim() === '') {
      Alert.alert('Validation Error', 'Post title and body cannot be empty.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const newPost = await createPost(newPostTitle, newPostBody);
      console.log('Created post details:', newPost);  
      setPosts((prevPosts) => [newPost, ...prevPosts]); 
      setNewPostTitle('');
      setNewPostBody('');
    } catch (err: any) {
      setError(err.message);
      console.error('Error details:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPost = await updatePost(id, 'Updated Title', 'This is an updated post.');
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      );
      console.log('Updated post:', updatedPost);
    } catch (err: any) {
      setError(err.message);
      console.error('Error details:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    console.log('Deleting post with id:', id); 
    setLoading(true);
    setError(null);
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      console.log('Deleted post with id:', id);
    } catch (err: any) {
      setError(err.message);
      console.error('Error deleting post:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Test CRUD here</Text>
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TextInput
            mode="outlined"
            label="New Post Title"
            value={newPostTitle}
            onChangeText={setNewPostTitle}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="New Post Body"
            value={newPostBody}
            onChangeText={setNewPostBody}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleCreatePost} style={styles.button}>
            Create Post
          </Button>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card style={styles.post}>
                <Card.Content>
                  <Title>{item.title}</Title>
                  <Paragraph>{item.body}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => handleUpdatePost(item.id)}>Update</Button>
                  <Button onPress={() => handleDeletePost(item.id)}>Delete</Button>
                </Card.Actions>
              </Card>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  post: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Home;
