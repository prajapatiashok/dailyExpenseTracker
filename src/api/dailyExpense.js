import axios from 'axios';

export default axios.create({
    baseURL: 'http://10.0.2.2:3000/'  
    // baseURL: 'http://6ec5c0de7d8c.ngrok.io/'  
});

