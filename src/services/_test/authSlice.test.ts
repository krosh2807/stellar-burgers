import authReducer, {
  login,
  logout,
  register,
  checkAuth,
  logoutUser,
  AuthState
} from '../authSlice';

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  };

  it('возвращает начальное состояние по умолчанию', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('обрабатывает checkAuth.pending — установка загрузки', () => {
    const action = { type: checkAuth.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает checkAuth.fulfilled — установка пользователя', () => {
    const user = { email: 'check@user.com', name: 'CheckUser' };
    const action = { type: checkAuth.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает checkAuth.rejected — ошибка авторизации', () => {
    const action = { type: checkAuth.rejected.type, payload: 'Auth check failed' };
    const state = authReducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Auth check failed');
  });

  it('обрабатывает login.pending — начало авторизации', () => {
    const action = { type: login.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает login.fulfilled — успешный вход', () => {
    const user = { email: 'demo@mail.com', name: 'DemoUser' };
    const action = { type: login.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает login.rejected — ошибка входа', () => {
    const action = { type: login.rejected.type, payload: 'Login failed' };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Login failed');
  });

  it('обрабатывает register.pending — регистрация начата', () => {
    const action = { type: register.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает register.fulfilled — регистрация успешна', () => {
    const user = { email: 'newuser@mail.com', name: 'Newbie' };
    const action = { type: register.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает register.rejected — ошибка регистрации', () => {
    const action = { type: register.rejected.type, payload: 'Registration error' };
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Registration error');
  });

  it('обрабатывает logoutUser.fulfilled — выход из аккаунта', () => {
    const loggedState: AuthState = {
      user: { email: 'user@example.com', name: 'LoggedUser' },
      isAuthenticated: true,
      isLoading: false,
      error: null
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = authReducer(loggedState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('обрабатывает logoutUser.rejected — ошибка выхода', () => {
    const action = { type: logoutUser.rejected.type, payload: 'Logout failed' };
    const state = authReducer(initialState, action);
    expect(state.error).toBe('Logout failed');
  });

  it('обрабатывает logout редьюсер напрямую', () => {
    const loggedState: AuthState = {
      user: { email: 'test@domain.com', name: 'Tester' },
      isAuthenticated: true,
      isLoading: false,
      error: null
    };
    const action = { type: logout.type };
    const state = authReducer(loggedState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
