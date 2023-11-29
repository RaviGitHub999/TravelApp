import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {endpoints} from '../../config/config';
import networkCall from '../../utils/networkCall';
import Storage from '../../utils/Storage';
// import {store} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
export interface authDataType {
  message: string | null;
  loading: boolean;
  token: string | null;
  userRole:string,
  email:string,
  password:string,
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
  userRole:"user",
  email:"",
  password:"",
};
//{ email, password, navigate }:LoginProps
export const loginAction = createAsyncThunk('auth/login', async ({navigate}:any) => {
  try {
    const email1="pavan@gmail.com"
    const password1='pavan@gmail'
    const response = await auth().signInWithEmailAndPassword(email1, password1);
    return {user:response.user,navigate};
  } catch (error:any) {
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
    handleOnChangeText:(state,action)=>
    {
return{
  ...state,
  [action.payload.name]:action.payload.event
}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        Alert.alert('Login successful!', '', [
          {
            text: 'OK',
            onPress: () => {
              action.payload.navigate("CustomerBottomNavigation")
            },
          },
        ]);
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        Alert.alert('Login failed',JSON.stringify(action.error.message));
      });
  },

});

export const {handleRole,handleOnChangeText} = AuthSlice.actions;

export default AuthSlice.reducer;
