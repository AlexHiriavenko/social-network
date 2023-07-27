import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";

//Получение всех пользователей
export const getUsers = createAsyncThunk("Users/getUsers", async function () {
  const { data } = await instance.get("/users");
  console.log(data);
  return data;
});

//Получение юзера по айди
export const getUser = createAsyncThunk("Users/getUser", async function (id) {
  const { data } = await instance.get(`/users/${id}`);
  console.log(data);
  return data;
});
//Редактирование юзера
export const updateUser = createAsyncThunk(
  "Users/updateUser",
  async function (updatedUser) {
    await instance.put("/users", updatedUser);
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
    authorizedUser: JSON.parse(localStorage.getItem("authorizedUser")) || null,
    friends: [],
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
    [getUsers.rejected]: (state) => {},
  },
});

export const { setUsers, setUser, setFriends, setAuthorizedUser } = UserSlice.actions;

export default UserSlice.reducer;
