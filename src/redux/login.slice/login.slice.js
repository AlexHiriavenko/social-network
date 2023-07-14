import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import axios from 'axios';

export const logIn = createAsyncThunk(
    'Login/logIn',
    async function({email,password}) {
        const token   =  await axios.post('http://localhost:9000/api/auth/login',{email:email,password:password});
        localStorage.setItem('token',JSON.stringify(token))
        console.log(token)
        return token;
    }
)

const LoginSlice = createSlice({
        name: 'Login',
        initialState: {
            isLoading: true,
            token: JSON.parse(localStorage.getItem("token")),
        },
        reducers: {
            login: (state, action) => {
                state.token = action.payload
            },

            logOut: (state, action) => {
                state.token = action.payload
                localStorage.removeItem('token')
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




export  const { login, logOut } = LoginSlice.actions;



export default LoginSlice.reducer;
