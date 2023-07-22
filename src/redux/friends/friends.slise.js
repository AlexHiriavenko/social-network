import { createSlice } from "@reduxjs/toolkit";
import { getFriendList, getFriendshipRequests, getFriendSuggestions, createFriendship, updateFriendship } from './actionCreators';


const initialState = {
  friendsList: [],
  isNeedToRefreshFriends: false,
  friendsRequests: [],
  friendSuggestions: [],
  status: null,
  error: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    removeSuggestions: function (state, action) {
      state.friendSuggestions = state.friendSuggestions.filter(el => el.id != action.payload.id);
    },
  },
  extraReducers: {
/*     [getFriendList.pending]: (state)=>{
      state.status = 'loading';
      state.error = null;
    }, */
    [getFriendList.fulfilled]: (state, action)=>{
      state.status = 'resolved';
      state.error = null;
      state.friendsList = action.payload;
      state.isNeedToRefreshFriends = false;
    },
    [getFriendshipRequests.fulfilled]: (state, action)=>{
      state.status = 'resolved';
      state.error = null;
      state.friendsRequests = action.payload;
      state.isNeedToRefreshRequests = false;
    },
    [getFriendSuggestions.fulfilled]: (state, action)=>{
      state.status = 'resolved';
      state.error = null;
      state.friendSuggestions = action.payload;
      state.isNeedToRefreshSuggestions = false;
    },
    [createFriendship.fulfilled]: (state, action)=>{
      state.status = 'resolved';
      state.error = null;
      state.friendsRequests.push(action.payload);
      state.friendSuggestions = state.friendSuggestions.filter(el => el.friend.id !== action.payload.friend.id);
    },
    [updateFriendship.fulfilled]: (state, action)=>{
      state.status = 'resolved';
      state.error = null;
      if(action.payload.status === 'accepted'){
        state.isNeedToRefreshFriends = true;
      }
      state.friendsRequests = state.friendsRequests.filter(el => el.id !== action.payload.id);
    },
  }
});

export const {removeSuggestions} = friendsSlice.actions;

export default friendsSlice.reducer;