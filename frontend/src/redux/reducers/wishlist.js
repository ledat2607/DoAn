import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const wishlistReducer = createReducer(initialState, {
  wishlistCreateRequest: (state) => {
    state.isLoading = true;
  },
  wishlistCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.cart = action.payload;
    state.success = true;
  },
  wishlistCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all cartItems of user
  getAllwishlistItemsUserRequest: (state) => {
    state.isLoading = true;
  },
  getAllwishlistItemsUserSuccess: (state, action) => {
    state.isLoading = false;
    state.wishlistItems = action.payload;
  },
  getAllwishlistItemsUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete itmes of a cart
  deleteItemsRequest: (state) => {
    state.isLoading = true;
  },
  deleteItemsSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteItemsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
