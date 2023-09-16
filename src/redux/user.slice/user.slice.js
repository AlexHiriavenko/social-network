import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import axios from "axios";


//Получение всех пользователей
export const getUsers = createAsyncThunk("Users/getUsers", async function () {
    const { data } = await instance.get("/users");

    return data;
});

//Получение юзера по айди
export const getUser = createAsyncThunk("Users/getUser", async function (id) {
    const { data } = await instance.get(`users/${id}`);

    return data;
});
export const getProfile = createAsyncThunk(
    "Users/getProfile",
    async function () {
        const { data } = await instance.get(`/users/profile`);

        return data;
    }
);
export const getUserImages = createAsyncThunk(
    "Users/getUserImages",
    async function (id) {
        const { data } = await instance.get(`/users/${id}/images`);

        return data;
    }
);
//Редактирование юзера
export const uploadAvatar = createAsyncThunk(
    "Users/uploadAvatar",
    async function ({ multipartFile, id }) {

        console.log(multipartFile)
        let accessToken = JSON.parse(localStorage.getItem('token'))

        await axios.post(`${import.meta.env.VITE_APP_API_URL}/users/avatar`, multipartFile,

            {

                headers:
                    {
                        'Content-Type': 'multipart/form-data',
                        'AUTHORIZATION': `Bearer ${accessToken}`
                    }
            }
        )

    }

);

export const uploadCoverPhoto = createAsyncThunk(
    "Users/uploadCoverPhoto",
    async function ({ multipartFile, id }) {


        let accessToken = JSON.parse(localStorage.getItem('token'))
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/users/header`, multipartFile,
            {

                headers:
                    {
                        'Content-Type': 'multipart/form-data',
                        'AUTHORIZATION': `Bearer ${accessToken}`
                    }
            }
        )

    }

);

export const uploadPhotos = createAsyncThunk(
    "Users/uploadPhotos",
    async function ({ multipartFiles, id }) {

        let accessToken = JSON.parse(localStorage.getItem('token'))
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/users/image`, multipartFiles,
            {

                headers:
                    {
                        'Content-Type': 'multipart/form-data',
                        'AUTHORIZATION': `Bearer ${accessToken}`
                    }
            }
        )

    }

);

export const findByPartOfName = createAsyncThunk(
    "Users/findByPartOfName",
    async function (part) {


        let accessToken = JSON.parse(localStorage.getItem('token'))
        let user =  await axios.get(`${import.meta.env.VITE_APP_API_URL}/users/part`,
            {
                params:{part:part},
                headers:
                    {
                        'Content-Type': 'application/json',
                        'AUTHORIZATION': `Bearer ${accessToken}`
                    }
            }
        )
        return user.data;

    }

);
export const updateUser = createAsyncThunk(
    "Users/updateUser",
    async function (updatedUser) {
        await instance.put("/users", updatedUser);
    }
);
export const deleteUserImage = createAsyncThunk(
    "Users/deleteUserImage",
    async function (imgId) {
        await instance.delete(`/userImages/${imgId}`);
    }
);
export const getMyChats = createAsyncThunk(
    "Users/getMyChats",
    async function (id) {
        const chats = await instance.get(`/users/${id}/chats`);
        console.log(chats);
        return chats;
    }
);
//Получение всех друзей по айди юзера
export const getFriends = createAsyncThunk(
    "Users/getFriends",
    async function (id) {
        const { data } = await instance.get(`/friends/${id}/friends`);

        return data;
    }
);
const UserSlice = createSlice({
    name: "Users",
    initialState: {
        allUsers: [],
        user: JSON.parse(localStorage.getItem("user")) || null,
        authorizedUser:
            JSON.parse(localStorage.getItem("authorizedUser")) || null,
        friends: JSON.parse(localStorage.getItem("friends")) || [],
        isLoading: true,
    },

    reducers: {
        setUserInitialState(state){
            state.authorizedUser = null
            state.user = null
            state.friends =[]

        },
        //Загрузка юзеров в стейт
        setUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        //Загрузка юзера в стейт
        setUser: (state, action) => {
            state.user = action.payload;
        },
        //Загрузка друзей юзера в стейт
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        // Set autorized user to State
        setAuthorizedUser: (state, action) => {
            state.authorizedUser = action.payload;
        },
    },
    extraReducers: {
        [getProfile.pending]: (state) => {
            state.isLoading = true;
        },
        [getProfile.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.authorizedUser = { ... action.payload,isAuthorized:true};
        },
        [getProfile.rejected]: (error) => { console.log(error)},
    },
});

export const { setUsers, setUser, setFriends, setAuthorizedUser,setUserInitialState
} =
    UserSlice.actions;

export default UserSlice.reducer;
