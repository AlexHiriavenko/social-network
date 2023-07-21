import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {readCookie} from "../../readCookie.js";

export const logIn = createAsyncThunk(
    'Login/logIn',
    async function({email,password}) {
        const token   =  await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/auth/login`,{email:email,password:password});
        document.cookie = `token=${token.data.accessToken}`;
        document.cookie = `refresh=${token.data.refreshToken}`;
        console.log(import.meta.env.VITE_APP_API_URL)
        let login = true
        localStorage.setItem('loggedIn',login)
        console.log(token)
        return token;
    }
)
export const getAccessToken = createAsyncThunk(
    'Login/getAccessToken',
    async function() {

        const refresh = readCookie('refresh')

        let token = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/auth/token`,{refreshToken:refresh})

        document.cookie = `token=${token.data.accessToken}`;

    }

)
export const register = createAsyncThunk(
    'Login/register',
    async function({emailOrPhone,password,name,surname,gender,mounth,day,year}) {
         await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/auth/registration`,{email:emailOrPhone,password:password,name:name,surname:surname,gender:gender,month:mounth,day:day,year:year});

    }
)

export const loginGoogle = createAsyncThunk(
    'Login/loginGoogle',
async function() {

        let token = await axios.get("http://localhost:9000/api/oauth2/authorization/google")

        document.cookie = `token=${token.data.accessToken}`;
        document.cookie = `refresh=${token.data.refreshToken}`;
}

)
const LoginSlice = createSlice({
        name: 'Login',
        initialState: {
            isLoading: true,
            isLoggedIn:JSON.parse(localStorage.getItem('loggedIn')),
            token: readCookie('token'),
        },
        reducers: {
            setLogin: (state, action) => {

               state.isLoggedIn = true
                let login = true
                localStorage.setItem('loggedIn',login)
            },

            logOut: (state, action) => {

                state.isLoggedIn = false
                let token = 0
                document.cookie = `token=${token}`

                let login = false
                localStorage.setItem('loggedIn',login)
            },
            extraReducers: {
                [logIn.pending]: (state) => {
                    state.isLoading = true;
                },
                [logIn.fulfilled]: (state, action) => {
                    state.isLoading = false
                    state.token = action.payload
                },
                [logIn.rejected]: (state) => {
                }
            }


        }
    }
)




export  const { setLogin, logOut } = LoginSlice.actions;



export default LoginSlice.reducer;
