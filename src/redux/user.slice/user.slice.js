import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import axios from "axios";

//Получение всех пользователей
export const getUsers = createAsyncThunk("Users/getUsers", async function () {
    const { data } = await instance.get("/users");
    // console.log(data);
    return data;
});

//Получение юзера по айди
export const getUser = createAsyncThunk("Users/getUser", async function (id) {
    const { data } = await instance.get(`users/${id}`);
    console.log(data);
    return data;
});
export const getProfile = createAsyncThunk(
    "Users/getProfile",
    async function () {
        const { data } = await instance.get(`/users/profile`);
        console.log(data);
        return data;
    }
);

//Редактирование юзера
export const uploadAvatar = createAsyncThunk(
    "Users/uploadAvatar",
    async function ({ multipartFile, id }) {

        console.log(multipartFile)
        let accessToken = JSON.parse(localStorage.getItem('token'))
        await axios.post(`https://social-network-backend-2782464b9c31.herokuapp.com/users/${id}/avatar`, multipartFile,
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

        console.log(multipartFile)
        let accessToken = JSON.parse(localStorage.getItem('token'))
        await axios.post(`https://social-network-backend-2782464b9c31.herokuapp.com/users/${id}/header`, multipartFile,
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


export const updateUser = createAsyncThunk(
    "Users/updateUser",
    async function (updatedUser) {
        await instance.put("/users", updatedUser);
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
        console.log(data);
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
        //Set autorized user to State
        setAuthorizedUser: (state, action) => {
            state.authorizedUser = action.payload;
        },
    },
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.isLoading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.value = action.payload;
        },
        [getUsers.rejected]: (state) => { },
    },
});

export const { setUsers, setUser, setFriends, setAuthorizedUser } =
    UserSlice.actions;

export default UserSlice.reducer;
