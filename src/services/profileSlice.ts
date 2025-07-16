import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';
import { getUserApi, updateUserApi } from '../utils/burger-api';

interface ProfileState {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  isLoading: false,
  error: null
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const res = await getUserApi();
      if (res && res.user) return res.user;
      return thunkAPI.rejectWithValue('Пользователь не найден');
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Ошибка загрузки профиля');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (user: Partial<TUser>, thunkAPI) => {
    try {
      const res = await updateUserApi(user);
      if (res && res.user) return res.user;
      return thunkAPI.rejectWithValue('Ошибка обновления профиля');
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || 'Ошибка обновления профиля'
      );
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки профиля';
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления профиля';
      });
  }
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
