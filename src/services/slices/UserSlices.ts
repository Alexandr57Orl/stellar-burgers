import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';

import {
  refreshToken,
  fetchWithRefresh,
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi
} from '@api';

type TStateUser = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAunticated: boolean;
  loginUserError: null | string | undefined;
  loginUserRequest: boolean;
};

const initialState: TStateUser = {
  user: null,
  isAuthChecked: false,
  isAunticated: false,
  loginUserError: null,
  loginUserRequest: false
};

export const toRegitrer = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);
export const toLogin = createAsyncThunk('user/login', loginUserApi);
export const toGetUserApi = createAsyncThunk('user/userApi', getUserApi);
export const toUpdateUser = createAsyncThunk('user/update', updateUserApi);
export const toLogout = createAsyncThunk('user/logout', logoutApi);

export const userStateSlice = createSlice({
  name: 'userstate',
  initialState,
  reducers: {
    authVerify: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(toGetUserApi.pending, (state) => {
        state.isAunticated = false;
        state.user = null;
        state.loginUserError = null;
      })
      .addCase(toGetUserApi.fulfilled, (state, action) => {
        state.isAunticated = true;
        state.user = action.payload.user;
        state.loginUserError = null;
      })
      .addCase(toGetUserApi.rejected, (state, action) => {
        state.isAunticated = false;
        state.user = null;
        state.loginUserError = action.error.message || 'Server error';
        state.isAuthChecked = true;
      })
      .addCase(toLogin.pending, (state) => {
        state.isAunticated = false;
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(toLogin.fulfilled, (state, action) => {
        state.isAunticated = true;
        state.user = action.payload.user;
        state.loginUserError = null;
        state.loginUserRequest = false;
      })
      .addCase(toLogin.rejected, (state, action) => {
        state.isAunticated = false;
        state.user = null;
        state.loginUserError = action.error.message || 'Server error';
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(toRegitrer.pending, (state) => {
        state.isAunticated = false;
        state.loginUserError = null;
      })
      .addCase(toRegitrer.fulfilled, (state, action) => {
        state.isAunticated = true;
        state.user = action.payload.user;
        state.loginUserError = null;
      })
      .addCase(toRegitrer.rejected, (state, action) => {
        state.isAunticated = false;
        state.user = null;
        state.loginUserError = action.error.message || 'Server error';
        state.isAuthChecked = true;
      })
      .addCase(toLogout.pending, (state) => {
        state.isAunticated = true;
      })
      .addCase(toLogout.fulfilled, (state) => {
        state.isAunticated = true;
        state.user = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(toLogout.rejected, (state, action) => {
        state.isAunticated = false;
        state.loginUserError = action.error.message || 'Server error';
      })
      .addCase(toUpdateUser.pending, (state) => {
        state.isAunticated = true;
      })
      .addCase(toUpdateUser.fulfilled, (state, action) => {
        state.isAunticated = true;
        state.user = action.payload.user;
      })
      .addCase(toUpdateUser.rejected, (state, action) => {
        state.isAunticated = false;
        state.loginUserError = action.error.message || 'Server error';
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAunticated: (state) => state.isAunticated,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectLoginUserError: (state) => state.loginUserError,
    selectLoginUserRequest: (state) => state.loginUserRequest
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(toGetUserApi())
        .then(() => {
          dispatch(userStateSlice.actions.authVerify());
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      dispatch(userStateSlice.actions.authVerify());
    }
  }
);
export const {
  selectUser,
  selectIsAunticated,
  selectIsAuthChecked,
  selectLoginUserError,
  selectLoginUserRequest
} = userStateSlice.selectors;

export const { authVerify } = userStateSlice.actions;
export default userStateSlice.reducer;
