import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api-test-pickel.lauviah.io/',
  });

export default instance