import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {readCookie} from "../../readCookie.js";

export const logIn = createAsyncThunk(
    'Login/logIn',
    async function({email,password}) {
        const token   =  await axios.post('http://localhost:9000/api/auth/login',{email:email,password:password});
        document.cookie = `token=${token.data.accessToken}`;
        let login = true
        localStorage.setItem('loggedIn',JSON.stringify(login))
        console.log(token)
        return token;
    }
)
export const register = createAsyncThunk(
    'Login/register',
    async function({emailOrPhone,password,name,surname,gender,mounth,day,year}) {
         await axios.post('http://localhost:9000/api/auth/registration',{email:emailOrPhone,password:password,name:name,surname:surname,gender:gender,month:mounth,day:day,year:year});

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

                state.isLoggedIn = action.payload
            },

            logOut: (state, action) => {

                state.isLoggedIn = false
                document.cookie = `token=${null}`
                let login = false
                localStorage.setItem('loggedIn',JSON.stringify(login))
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
