import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPost: {
    isOpen: false,
  },
  editProfile: {
    isOpen: false,
  },
  commentPost: {
    isOpen: false,
    openedPostId: null,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCreateModal: function (state) {
      state.createPost.isOpen = true;
    },
    closeCreateModal: function (state) {
      state.createPost.isOpen = false;
    },
    openEditProfileModal: function (state) {
      state.editProfile.isOpen = true;
    },
    closeEditProfileModal: function (state) {
      state.editProfile.isOpen = false;
    },
    openCreateCommentModal: function (state, action) {
      state.commentPost.isOpen = true;
      state.commentPost.post = action.payload;
    },
    closeCreateCommentModal: function (state) {
      state.commentPost.isOpen = false;
      state.commentPost.post = null;
    },
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openEditProfileModal,
  closeEditProfileModal,
  openCreateCommentModal,
  closeCreateCommentModal,
} = modalSlice.actions;

export default modalSlice.reducer;
