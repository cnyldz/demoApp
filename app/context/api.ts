import axios from 'axios';
import Constants from 'expo-constants';
import { Post } from '/Users/heavyshark/demoApp/types/post';

const { API_URL } = Constants.expoConfig.extra;

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log('Fetched posts:', response.data);
    return response.data.posts; 
  } catch (error: any) {
    console.error('Error fetching posts:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch posts');
  }
};

export const createPost = async (title: string, body: string): Promise<Post> => {
  try {
    const response = await axios.post(`${API_URL}/posts/add`, {
      title,
      body,
      userId: 1,
    });
    console.log('Created post:', response.data);
    return response.data; 
  } catch (error: any) {
    console.error('Error creating post:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create post');
  }
};

export const updatePost = async (id: number, title: string, body: string): Promise<Post> => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, {
      title,
      body,
      userId: 1,
    });
    console.log('Updated post:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating post:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update post');
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${id}`);
    console.log('Deleted post:', response.data);
  } catch (error: any) {
    console.error('Error deleting post:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete post');
  }
};
