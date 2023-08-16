import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { readCookie } from "../../readCookie.js";
import { parseJwt } from "../../parseJwt.js";
import instance from "../../instance.js";


export const logIn = createAsyncThunk(
    "Login/logIn",

    async function ({ email, password }) {
        const token = await axios.post(
            `https://social-network-backend-2782464b9c31.herokuapp.com/api/auth/login`,
            { email: email, password: password }
        );
        localStorage.setItem("token", JSON.stringify(token.data.accessToken));
        localStorage.setItem("refresh", JSON.stringify(token.data.refreshToken));
        console.log(import.meta.env.VITE_APP_API_URL);
        let login = true;
        localStorage.setItem("loggedIn", login);
        let auth = parseJwt(token.data.accessToken);
        localStorage.setItem("auth", JSON.stringify(auth));
        console.log(token);
        return token;
    }
);
export const getAccessToken = createAsyncThunk(
    "Login/getAccessToken",
    async function () {
        const refresh = JSON.parse(localStorage.getItem("refresh"))
        let token = await axios.post(
            `https://social-network-backend-2782464b9c31.herokuapp.com/api/auth/refresh`,
            { refreshToken: refresh }
        );
        //document.cookie = `token=${token.data.accessToken}`;
        localStorage.setItem("token",JSON.stringify(token.data.accessToken))
        localStorage.setItem("refresh",JSON.stringify(token.data.refreshToken))
        return token.data.accessToken;
    }
);
export const sendEmail = createAsyncThunk(
    "Login/sendEmail",
    async function (email) {
        await axios.post(
            `https://social-network-backend-2782464b9c31.herokuapp.com/api/auth/passwordLetter`,
            { email: email }
        );
    }
);
export const changePassword = createAsyncThunk(
    "Login/changePassword",
    async function ({ code, newPassword }) {
        const { status } = await axios.put(
            `https://social-network-backend-2782464b9c31.herokuapp.com/api/auth`,
            { code: code, newPassword: newPassword }
        );
        return status;
    }
);
export const register = createAsyncThunk(
    "Login/register",
    async function ({
                        emailOrPhone,
                        password,
                        name,
                        surname,
                        gender,
                        mounth,
                        day,
                        year,
                    }) {
        await axios.post(
            `https://social-network-backend-2782464b9c31.herokuapp.com/api/auth/registration`,
            {
                email: emailOrPhone,
                password: password,
                name: name,
                surname: surname,
                gender: gender,
                month: mounth,
                day: day,
                year: year,
            }
        );
    }
);

export const loginGoogle = createAsyncThunk(
    "Login/loginGoogle",
    async function () {
        let token = await axios.get(
            "https://social-network-backend-2782464b9c31.herokuapp.com/api/oauth2/authorization/google"
        );
        document.cookie = `token=${token.data.accessToken}`;
        document.cookie = `refresh=${token.data.refreshToken}`;
        localStorage.setItem("token", JSON.stringify(token.data.accessToken));
        localStorage.setItem("refresh", JSON.stringify(token.data.refreshToken));
        let auth = parseJwt(token.data.accessToken);
        localStorage.setItem("auth", JSON.stringify(auth));
        const { data } = await instance.get(`/users/profile`);
        localStorage.setItem("authorizedUser", JSON.stringify({...data,isAuthorized:true}));
        localStorage.setItem("user", JSON.stringify(data));

        console.log(token);
    }
);
const LoginSlice = createSlice({
    name: "Login",
    initialState: {
        isLoading: true,
        isLoggedIn: JSON.parse(localStorage.getItem("loggedIn")),
        token:

            JSON.parse(localStorage.getItem("token"))
    },
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = true;
            let login = true;
            localStorage.setItem("loggedIn", login);
        },
        logOut: (state, action) => {
            state.isLoggedIn = false;
            let token = 0;
            localStorage.setItem('token',JSON.stringify("out"))
            localStorage.setItem('refresh',JSON.stringify("out"))

            let login = false;
            localStorage.setItem("loggedIn", login);
            localStorage.removeItem("authorizedUser");
            localStorage.removeItem("auth");
            localStorage.removeItem("user");

        },
        extraReducers: {
            [logIn.pending]: (state) => {
                state.isLoading = true;
            },
            [logIn.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.token = action.payload;
            },
            [logIn.rejected]: (state) => {},
        },
    },
});

export const { setLogin, logOut } = LoginSlice.actions;

export default LoginSlice.reducer;
