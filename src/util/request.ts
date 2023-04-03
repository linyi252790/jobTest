import axios from 'axios';
import {Notify} from 'vant';

const instance = axios.create({
    baseURL: 'https://yw.52kfw.cn',
    timeout: 5000,
});

/*定义拦截器*/
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    /*配置 token */
    config.headers = config.headers || {};

    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');

    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if (response.data.statusCode !== 200) {
        Notify({
            message: '系统繁忙！',
            duration: 800,
            type: 'danger'
        });
    }
    return response.data;

}, function (error) {
    return Promise.reject(error);
});


export default instance;
