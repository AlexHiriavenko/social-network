import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPost: {
    isOpen: false,
  },
  editProfile: {
    isOpen: false,
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
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openEditProfileModal,
  closeEditProfileModal,
} = modalSlice.actions;

export default modalSlice.reducer;
