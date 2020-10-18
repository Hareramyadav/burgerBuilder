import axios from 'axios';

const instance = axios.create({
    baseURL:'https://my-react-burger-b3504.firebaseio.com/'
});

export default instance;
