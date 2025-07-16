import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(email: string, password: string): Promise<string> {
  const res = await axios.post(`http://192.168.20.77:3000/api/v1/merchants/login`, { email, password });
  return res.data.token; // Adjust based on your backend
}
