import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import instance from "../../instance";

//Получение всех постов
export const getPosts = createAsyncThunk("Posts/getPosts", async function () {
  const { data } = await instance.get("/posts");
  console.log(data);
  return data;
});

//Получение всех постов частями
export const getPageblePosts = createAsyncThunk(
  "Posts/getPageblePosts",
  async function (page, size) {
    const { data } = await instance.get(`/posts/${page}/${size}`);
    console.log(data);
    return data;
  }
);

//Получение поста по айди
export const getPost = createAsyncThunk("Posts/getPost", async function (id) {
  const { data } = await instance.get(`/posts/${id}`);
  console.log(data);
  return data;
});

//Редактирование поста
export const updatePost = createAsyncThunk(
  "Posts/updatePost",
  async function (updatedPost) {
    await instance.put("/posts", updatedPost);
  }
);

// //Создание поста
// export const createPost = createAsyncThunk(
//   "Posts/updatePost",
//   async function (updatedPost) {
//     await instance.put("/posts", updatedPost);
//   }
// );

const initialState = {
  isCreated: false,
};

const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    post: {},
  },
  reducers: {
    createPost: function (state, action) {
      state.isCreated = true;
    },
    setPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { createPost, deletePost, setPosts } = postSlice.actions;

export default postSlice.reducer;
