import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";
import axios from "axios";

//Получение всех постов
export const getPosts = createAsyncThunk("Posts/getPosts", async function () {
  const { data } = await instance.get("/posts");
  return data;
});

//Получение всех постов частями
export const getPageblePosts = createAsyncThunk(
  "Posts/getPageblePosts",
  async function ({ page, size }) {
    const { data } = await instance.get(`/posts/${page}/${size}`);
    return data;
  }
);

//Получение поста по айди
export const getPost = createAsyncThunk("Posts/getPost", async function (id) {
  const { data } = await instance.get(`/posts/${id}`);
  return data;
});

//Редактирование поста
export const updatePost = createAsyncThunk(
  "Posts/updatePost",
  async function (updatedPost) {
    await instance.put("/posts", updatedPost);
  }
);

//Создание поста
export const createPost = createAsyncThunk(
  "Posts/updatePost",
  async function ({ multipartFiles }) {
    let accessToken = JSON.parse(localStorage.getItem('token'))
    const data = await axios.post(`${import.meta.env.VITE_APP_API_URL}/posts`, multipartFiles, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'AUTHORIZATION': `Bearer ${accessToken}`
      }
    })
    return data;
  }
);

// Получение постов по айди юзера
export const getPostsByUserId = createAsyncThunk(
  "Posts/getPostsByUserId",
  async function (id) {
    const { data } = await instance.get(`/users/${id}/posts`);
    return data;
  }
);

export const likePost = createAsyncThunk("Posts/likePost", async function (id) {
  const { data } = await instance.put(`/posts/like-post/${id}`);
  return data;
});

export const removeLikePost = createAsyncThunk(
  "Posts/likePost",
  async function (id) {
    const { data } = await instance.put(`/posts/remove-like-post/${id}`);
    return data;
  }
);

export const repostPost = createAsyncThunk(
  "Posts/repostPost",
  async function ({ id, content }) {
    const { data } = await instance.post(`/posts/repost/${id}`, {
      content: content,
    });
    return data;
  }
);

export const commentPost = createAsyncThunk(
  "Posts/commentPost",
  async function ({ id, content }) {
    const { data } = await instance.post(`/posts/comment/${id}`, {
      content: content,
    });
    return data;
  }
);


const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    allUserPosts: [],
    visiblePosts: [],
    post: {},
  },
  reducers: {
    setPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setUserPosts: (state, action) => {
      state.allUserPosts = action.payload;
    },
    setVisiblePosts: (state, action) => {
      state.visiblePosts = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { deletePost, setPosts, setUserPosts, setPost, setVisiblePosts } =
  postSlice.actions;

export default postSlice.reducer;
