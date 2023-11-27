import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  loading: false,
  admins: [],
  error: null,
  successMessage: null,
};

export const adminReducer = createReducer(initialState, {
  LoadAdminRequest: (state) => {
    state.loading = true;
  },
  LoadAdminSuccess: (state, action) => {
    state.isAdmin = true;
    state.loading = false;
    state.admins = action.payload;
  },
  LoadAdminFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAdmin = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});
