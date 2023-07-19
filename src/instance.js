
import axios from 'axios';
import {readCookie} from "./readCookie.js";



const instance = axios.create({

    baseURL:'http://localhost:9000'



})

instance.interceptors.request.use(config =>{
    let accessToken = readCookie('token')
    if(accessToken){
        config.headers = {
            'Content-Type': 'application/json',
            'AUTHORIZATION':`Bearer ${accessToken}`
        }

    }
    return config;
})

export default instance;
