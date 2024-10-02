import {
  TStateUser,
  toLogin,
  toLogout,
  toRegister,
  userStateSlice,
  authVerify,
  toUpdateUser
} from './UserSlices';

const initialState: TStateUser = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false
};

const fakeUser = {
  succes: true,
  accestoken: 'test',
  refreshToken: 'test',
  user: {
    name: 'test',
    email: 'test@ya.ru'
  }
};

const testLogin = {
  email: 'test@ya.ru',
  password: 'test'
};

const testRegister = {
  name: 'test',
  email: 'test@ya.ru',
  password: 'test'
};

const testUpdateUser = {
  success: true,
  user: {
    name: 'test',
    email: 'test@ya.ru'
  }
};

describe('User slice tests', () => {
  it('user should handle authVerify', () => {
    const presentState = {
      ...initialState,
      isAuthChecked: false // эмулируем неуспешное завершение запроса
    };
    // вызываем редьюсер с предыдущим состоянием и экшеном
    const currentState = userStateSlice.reducer(presentState, authVerify());

    const expectedState = {
      ...initialState,
      isAuthChecked: true
    };
    expect(currentState).toEqual(expectedState);
  });
  // ожидаемое состояние после вызова редьюсера
});

describe('User slice tests, extraReducers', () => {
  it('user should handle toRegister, pending', () => {
    const currentState = userStateSlice.reducer(
      initialState,
      toRegister.pending('', testRegister)
    );
    expect(currentState).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null,
      loginUserRequest: true
    });
  });

  it('user should handle toRegister, fulfilled', () => {
    const currentState = userStateSlice.reducer(
      initialState,
      toRegister.fulfilled(fakeUser.user, '', testRegister)
    );
    expect(currentState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: fakeUser.user,
      loginUserRequest: false
    });
  });
  it('user should handle toRegister, rejected', () => {
    const err = new Error('User Log in Error');
    const currentState = userStateSlice.reducer(
      initialState,
      toRegister.rejected(err, '', testRegister)
    );
    expect(currentState).toEqual({
      ...initialState,
      loginUserRequest: false,
      isAuthenticated: false,
      loginUserError: 'User Log in Error'
    });
  });
  it('user should handle toLogout, pending', () => {
    const presentState = {
      ...initialState,
      isAuthenticated: true,
      user: fakeUser.user
    };

    const currentState = userStateSlice.reducer(
      presentState,
      toLogout.pending('')
    );
    expect(currentState).toEqual({
      ...presentState,
      loginUserRequest: true
    });
  });
  it(`user should handle toLogout, fulfilled`, () => {
    const currentState = userStateSlice.reducer(
      initialState,
      toLogout.fulfilled(undefined, '')
    );
    expect(currentState).toEqual({
      isAuthenticated: false,
      user: null,
      loginUserRequest: false,
      isAuthChecked: false,
      loginUserError: null
    });
  });
  it(`user should handle toLogout, rejected`, () => {
    const err = new Error('Failed to log out');
    const presentState = {
      ...initialState,
      isAuthenticated: true,
      user: fakeUser.user
    };

    const currentState = userStateSlice.reducer(
      presentState,
      toLogout.rejected(err, '')
    );
    expect(currentState).toEqual({
      ...presentState,
      isAuthenticated: false,
      loginUserError: 'Failed to log out',
      loginUserRequest: false
    });
  });
  it('user should handle toLogin, pending pending status', () => {
    const currentState = userStateSlice.reducer(
      initialState,
      toLogin.pending('', testLogin)
    );

    expect(currentState).toEqual({
      ...initialState,
      loginUserError: null,
      loginUserRequest: true
    });
  });

  it('user should handle toLogin, pending fulfilled status', () => {
    const currentState = userStateSlice.reducer(
      initialState,
      toLogin.fulfilled(fakeUser.user, '', testRegister)
    );

    expect(currentState).toEqual({
      ...initialState,
      user: fakeUser.user,
      isAuthenticated: true,
      isAuthChecked: true,
      loginUserRequest: false
    });
  });

  it('user should handle toLogin,  rejected status', () => {
    const error = new Error('User Log in Error');
    const currentState = userStateSlice.reducer(
      initialState,
      toLogin.rejected(error, '', testLogin)
    );

    expect(currentState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserRequest: false,
      isAuthenticated: false,
      loginUserError: 'User Log in Error'
    });
  });

  it('user should handle toUpdateUser, pending', () => {
    const currentState = userStateSlice.reducer(
      initialState,
      toUpdateUser.pending('', testUpdateUser.user)
    );
    expect(currentState).toEqual({
      ...initialState,
      isAuthenticated: true,
      loginUserRequest: true
    });
  });
  it('user should handle toUpdateUser, fulfilled', () => {
    const currentState = userStateSlice.reducer(
      initialState,
      toUpdateUser.fulfilled(testUpdateUser, '', fakeUser.user)
    );
    expect(currentState).toEqual({
      isAuthenticated: true,
      user: testUpdateUser.user,
      loginUserRequest: false,
      isAuthChecked: false,
      loginUserError: null
    });
  });
  it('user should handle toUpdateUser, rejected', () => {
    const error = new Error('Failed to fetch update user');
    const currentState = userStateSlice.reducer(
      initialState,
      toUpdateUser.rejected(error, '', fakeUser.user)
    );

    expect(currentState).toEqual({
      ...initialState,
      loginUserError: error.message,
      loginUserRequest: false
    });
  });
});
