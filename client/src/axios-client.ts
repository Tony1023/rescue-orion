import axios from 'axios';

const client = axios.create();

client.interceptors.response.use((res) => res, (err) => {
  if (err.response.status === 401) {
    alert('Your session has expired. Please sign in again.');
    window.location.href = '/admin';
  }
  return err;
});

export default client;
