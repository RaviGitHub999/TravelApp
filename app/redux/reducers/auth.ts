import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {endpoints} from '../../config/config';
import networkCall from '../../utils/networkCall';
import Storage from '../../utils/Storage';
// import {store} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
export interface authDataType {
  message: string | null;
  loading: boolean;
  token: string | null;
  userRole:string
}
 interface LoginProps{
  email:string,
  password:string,
  navigate:(screen: string) => void
}
const initialState: authDataType = {
  message: null,
  loading: false,
  token: null,
  userRole:"user"
};
//{ email, password, navigate }:LoginProps
export const loginAction = createAsyncThunk('auth/login', async () => {
  try {
    const email1="pavan@gmail.com"
    const password1='pavan@gmail'
    const response = await auth().signInWithEmailAndPassword(email1, password1);
    // console.log('User signed inxxxxxxxxxxxxx!', response.user);
    // navigate("CustomerBottomNavigation");
    return response.user;
  } catch (error:any) {
    console.error('Error signing in:', error.message);
    throw error;
  }
});

export const AuthSlice = createSlice({
  name: 'authlice',
  initialState,
  reducers: {
    handleRole:(state,action)=>
    {
if(action.payload.role==="user")
{
state.userRole="user"
action.payload.navigation.navigate("Login")
}
else{
  state.userRole="admin"
  action.payload.navigation.navigate("Login")
}
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.pending, (state) => {
      state.token = 'token';
      state.loading = true;
      state.message = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.uid;
      state.message = null;
      state.userRole="user"
      console.log(action.payload,"khjvghbj")
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });
   
  },
});

export const {handleRole} = AuthSlice.actions;

export default AuthSlice.reducer;
