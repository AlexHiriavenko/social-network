
import axios from 'axios';
import {readCookie} from "./readCookie.js";



const instance = axios.create({

    baseURL:'http://localhost:9000'



})

instance.interceptors.request.use(config =>{
    //const token = JSON.parse(localStorage.getItem('token'))
   // console.log(token.accessToken)
    let accessToken = readCookie('token')
    if(accessToken){
        config.headers = {
            'Content-Type': 'application/json',
            //'AUTHORIZATION':`Bearer ${token.accessToken}`
            'AUTHORIZATION':`Bearer ${accessToken}`
        }

    }
    return config;
})

export default instance;
//eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhIiwiZXhwIjoxNjg2NzI5NTQ1LCJyb2xlcyI6W10sImZpcnN0TmFtZSI6ImEifQ.LNsECJmH3hnBFu6ByopNRzf2vULz1dFG3guAPhuKs9W-xAKuPkd3kAxrW9yDpVYeRyrew6_x5ptENvXvE2c0hA