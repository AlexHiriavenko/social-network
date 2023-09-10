import { createSlice } from "@reduxjs/toolkit";
import { getFriendList, getFriendshipRequests, getFriendSuggestions, createFriendship, updateFriendship, getFriendsByName, getBirthdays } from './actionCreators';


const initialState = {
  friendsList: [],
  isNeedToRefreshFriends: false,
  friendsRequests: [],
  friendSuggestions: [],
  currentFriend: {},
  birthdays: [[]]
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setInitialState:function (state){
      state.friendsList = []
      state.friendsRequests= []
      state.friendSuggestions= []
      state.birthdays = [[]]
      state.currentFriend={}
    },
    removeSuggestions: function (state, action) {
      state.friendSuggestions = state.friendSuggestions.filter(el => el.friend.id != action.payload.friend.id);
    },
    setCurrentFriend: function(state, action) {
      state.currentFriend = action.payload;
    },
    removeFriend: function(state, action) {
      state.friendsList = state.friendsList.filter(el => el.friend.id != action.payload);
    },
  },
  extraReducers: {
/*     [getFriendList.pending]: (state)=>{
      state.status = 'loading';
      state.error = null;
    }, */
    [getFriendList.fulfilled]: (state, action)=>{
      state.friendsList = action.payload;
      state.isNeedToRefreshFriends = false;
    },
    [getFriendshipRequests.fulfilled]: (state, action)=>{
      state.friendsRequests = action.payload;
      state.isNeedToRefreshRequests = false;
    },
    [getFriendSuggestions.fulfilled]: (state, action)=>{
      state.friendSuggestions = action.payload;
      state.isNeedToRefreshSuggestions = false;
    },
    [createFriendship.fulfilled]: (state, action)=>{
      state.friendsRequests.push(action.payload);
      state.friendSuggestions = state.friendSuggestions.filter(el => el.friend.id !== action.payload.friend.id);
    },
    [updateFriendship.fulfilled]: (state, action)=>{
      if(action.payload.status === 'accepted'){
        state.isNeedToRefreshFriends = true;
      }
      state.friendsRequests = state.friendsRequests.filter(el => el.id !== action.payload.id);
    },
    [getFriendsByName.fulfilled]: (state, action)=>{
      state.friendsList = action.payload;
      if(action.payload.filter(el => el.id === state.currentFriend.id).length === 0) {
        state.currentFriend = {};
      }
    },
    [getBirthdays.fulfilled]: (state, action)=>{
      state.birthdays = action.payload;
    },
    [getBirthdays.fulfilled]: (state, action)=>{
      state.birthdays = action.payload;
    },
  }
});

export const {removeSuggestions, setCurrentFriend, setSearchValue, removeFriend,setInitialState} = friendsSlice.actions;

export default friendsSlice.reducer;