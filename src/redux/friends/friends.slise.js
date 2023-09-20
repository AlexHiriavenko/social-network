import { createSlice } from "@reduxjs/toolkit";
import { 
  getFriendList, 
  getFriendshipRequests, 
  getFriendSuggestions, 
  createFriendship, 
  updateFriendship, 
  getFriendsByName, 
  getBirthdays, 
  getFriendListPage,
  getFriendshipRequestsPage,
  getFriendSuggestionsPage,
 } from './actionCreators';


const initialState = {
  friendsList: [],
  friendsRequests: [],
  friendSuggestions: [],
  currentFriend: {},
  birthdays: [[]],
  isLoadingFriends: false,
  isLoadingSuggestions: false,
  isLoadingRequests: false,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setInitialState: function (state){
      state.friendsList = [];
      state.friendsRequests = [];
      state.friendSuggestions = [];
      state.currentFriend = {};
      state.birthdays = [[]];
      state.isLoadingFriends = false;
      state.isLoadingSuggestions = false;
      state.isLoadingRequests = false;
    },
    setCurrentFriend: function(state, action) {
      state.currentFriend = action.payload;
    },
    removeFriend: function(state, action) {
      state.friendsList = state.friendsList.filter(el => el.friend.id != action.payload);
    },
    setFriendsList: function(state, action) {
      state.friendsList = action.payload;
    },
    setFriendsSuggestions: function(state, action) {
      state.friendSuggestions = action.payload;
    },
  },
  extraReducers: {
    [getFriendListPage.pending]: (state)=>{
      state.isLoadingFriends =  true;
    },
    [getFriendList.fulfilled]: (state, action)=>{
      state.friendsList = action.payload;
    },
    [getFriendListPage.fulfilled]: (state, action)=>{
      state.friendsList = [...state.friendsList, ...action.payload];
      state.isLoadingFriends =  false;
    },
    [getFriendshipRequests.fulfilled]: (state, action)=>{
      state.friendsRequests = action.payload;
      state.isLoadingRequests =  false;
    },
    [getFriendshipRequests.pending]: (state)=>{
      state.isLoadingRequests =  true;
    },
/*     [getFriendshipRequestsPage.fulfilled]: (state, action)=>{
      state.friendsRequests = [...state.friendsRequests, ...action.payload];
      state.isLoading =  false;
    }, */
    [getFriendSuggestions.fulfilled]: (state, action)=>{
      state.friendSuggestions = action.payload;
    },
    [getFriendSuggestionsPage.pending]: (state)=>{
      state.isLoadingSuggestions =  true;
    },
    [getFriendSuggestionsPage.fulfilled]: (state, action)=>{
      state.friendSuggestions = [...state.friendSuggestions, ...action.payload];
      state.isLoadingSuggestions =  false;
    },
    [createFriendship.fulfilled]: (state, action)=>{
      if (action.payload.status === 'pending') {
        state.friendsRequests.push(action.payload);
        state.friendSuggestions = state.friendSuggestions.filter(el => el.friend.id !== action.payload.friend.id);
      } else if (action.payload.status === 'removed') {
        state.friendSuggestions = state.friendSuggestions.filter(el => el.friend.id != action.payload.friend.id);
      }
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
  }
});

export const {
  removeSuggestions, 
  setCurrentFriend, 
  setSearchValue, 
  removeFriend, 
  setFriendsList, 
  setInitialState, 
  setFriendsSuggestions
} = friendsSlice.actions;

export default friendsSlice.reducer;