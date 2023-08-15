import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";

export const getFriendsById = createAsyncThunk(
    'friends/getFriendsById',
    async function(userId) {
      const { data } = await instance.get(`/friends/${userId}/friends`);
      return data;
    }
  );

  export const getFriendsByName = createAsyncThunk(
    'friends/getFriendsByName',
    async function(payload) {
      const { data } = await instance.post("/friends/search", payload);
      return data;
    }
  );

  export const getFriendList = createAsyncThunk(
    'friends/getFriendList',
    async function() {
      const { data } = await instance.get(`/friends/userFriends`);
      return data;
    }
  );

  export const getFriendshipRequests = createAsyncThunk(
    'friends/getFriendshipRequests',
    async function() {
      const { data } = await instance.get("/friends/requests");
      return data;
    }
  );
  
  export const getFriendSuggestions = createAsyncThunk(
    'friends/getFriendSuggestions',
    async function() {
      const { data } = await instance.get("/friends/suggestions");
      return data;
    }
  );

  export const createFriendship = createAsyncThunk(
    'friends/createFriendship',
    async function(payload) {
      const { data } = await instance.post("/friends", payload);
      return data;
    }
  );

  export const updateFriendship = createAsyncThunk(
    'friends/updateFriendship',
    async function(payload) {
      const { data } = await instance.put("/friends", payload);
      return data;
    }
  );