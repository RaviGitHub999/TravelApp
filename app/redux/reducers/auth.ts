import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {endpoints} from '../../config/config';
import networkCall from '../../utils/networkCall';
import Storage from '../../utils/Storage';
// import {store} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface authDataType {
  message: string | null;
  loading: boolean;
  token: string | null;
}

const initialState: authDataType = {
  message: null,
  loading: false,
  token: null,
};

export const loginAction = createAsyncThunk(
  'loginAction',
  async (
    {username, password}: {username: string; password: string},
    {getState, rejectWithValue, fulfillWithValue},
  ) => {
    const data = {
      username,
      password,
    };

    const {response, error} = await networkCall(
      endpoints.LOGIN,
      'POST',
      JSON.stringify(data),
    );
    if (response) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue('Something went wrong!');
    }
  },
);



export const AuthSlice = createSlice({
  name: 'authlice',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.token = 'token';
      state.loading = true;
      state.message = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.message = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });
   
  },
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
