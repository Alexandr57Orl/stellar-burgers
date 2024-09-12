import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import { TRegisterData } from '@api';

import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
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

export const toRegister = createAsyncThunk(
  'user/register',
  async ({ name, email, password }: TRegisterData) => {
    const data = await registerUserApi({ name, email, password });
    setCookie('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);
export const toLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);
export const toLogout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.clear();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const toGetUserApi = createAsyncThunk('user/userApi', getUserApi);
export const toUpdateUser = createAsyncThunk('user/update', updateUserApi);

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
        state.loginUserRequest = true;
      })
      .addCase(toGetUserApi.fulfilled, (state, action) => {
        state.isAunticated = true;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(toGetUserApi.rejected, (state, action) => {
        state.isAunticated = false;
        state.user = null;
        state.loginUserError = action.error.message || 'Server error';
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(toLogin.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(toLogin.fulfilled, (state, action) => {
        state.isAunticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(toLogin.rejected, (state, action) => {
        state.loginUserError = action.error.message || 'Server error';
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(toRegister.pending, (state) => {
        state.isAunticated = false;
        state.loginUserRequest = true;
        state.user = null;
      })
      .addCase(toRegister.fulfilled, (state, action) => {
        state.isAunticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(toRegister.rejected, (state, action) => {
        state.isAunticated = false;
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Server error';
      })
      .addCase(toLogout.pending, (state) => {
        state.isAunticated = true;
        state.loginUserRequest = true;
      })
      .addCase(toLogout.fulfilled, (state) => {
        state.isAunticated = false;
        state.user = null;
        state.loginUserRequest = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(toLogout.rejected, (state, action) => {
        state.isAunticated = false;
        state.loginUserError = action.error.message || 'Server error';
        state.loginUserRequest = false;
      })
      .addCase(toUpdateUser.pending, (state) => {
        state.isAunticated = true;
        state.loginUserRequest = true;
      })
      .addCase(toUpdateUser.fulfilled, (state, action) => {
        state.isAunticated = true;
        state.loginUserRequest = false;
        state.user = action.payload.user;
      })
      .addCase(toUpdateUser.rejected, (state, action) => {
        state.isAunticated = false;
        state.loginUserRequest = false;
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
      dispatch(toGetUserApi()).finally(() => {
        dispatch(authVerify());
      });
    } else {
      dispatch(authVerify());
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
