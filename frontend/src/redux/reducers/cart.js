import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const cartReducer = createReducer(initialState, {
  cartCreateRequest: (state) => {
    state.isLoading = true;
  },
  cartCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.cart = action.payload;
    state.success = true;
  },
  cartCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all cartItems of user
  getAllCartItemsUserRequest: (state) => {
    state.isLoading = true;
  },
  getAllCartItemsUserSuccess: (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload;
  },
  getAllCartItemsUserFailed: (state, action) => {
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

  //   // get all products
  //   getAllProductsRequest: (state) => {
  //     state.isLoading = true;
  //   },
  //   getAllProductsSuccess: (state, action) => {
  //     state.isLoading = false;
  //     state.allProducts = action.payload;
  //   },
  //   getAllProductsFailed: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },

  clearErrors: (state) => {
    state.error = null;
  },
});
