
import axios from 'axios';
import {readCookie} from "./readCookie.js";



const instance = axios.create({

    // baseURL:`${import.meta.env.VITE_APP_API_URL}`
    baseURL: "https://social-network-backend-2782464b9c31.herokuapp.com"
    //baseURL: "http://localhost:9000"

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
