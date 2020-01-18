import axios from 'axios';

const api = axios.create({
    baseURL: "http://zk-t3f.anonymous.mobile.exp.direct:3333"
})

export default api;