import axios from 'axios';
import Config from '../Config.json';

const api = axios.create({
    baseURL: Config.serveUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;