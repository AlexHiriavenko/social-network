import { createAsyncThunk } from "@reduxjs/toolkit";

const SERVER_URL = 'http://localhost:9000';

export const getFriendList = createAsyncThunk(
    'friends/getFriendList',
    async function(userId){
      const response = await fetch(`${SERVER_URL}/friends/${userId}/friends`);
      const data = await response.json();
      return data;
    }
  );

  export const getFriendshipRequests = createAsyncThunk(
    'friends/getFriendshipRequests',
    async function(userId){
      const response = await fetch(`${SERVER_URL}/friends/${userId}/requests`);
      const data = await response.json();
      return data;
    }
  );
  
  export const getFriendSuggestions = createAsyncThunk(
    'friends/getFriendSuggestions',
    async function(userId){
      const response = await fetch(`${SERVER_URL}/friends/${userId}/suggestions`);
      const data = await response.json();
      return data;
    }
  );

  export const createFriendship = createAsyncThunk(
    'friends/createFriendship',
    async function(payload){
      const response = await fetch(`${SERVER_URL}/friends`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    }
  );

  export const updateFriendship = createAsyncThunk(
    'friends/updateFriendship',
    async function(payload){
      const response = await fetch(`${SERVER_URL}/friends`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    }
  );