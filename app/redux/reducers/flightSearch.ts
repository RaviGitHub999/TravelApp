import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const initialState={
origin:"",
destination:"",
departure:"",
return:'',
adults:0,
children:0,
infants:0,
classes:"Economy",
directflight:false
}

export const flightSearch=createSlice(
{
name:"flightSearch",
initialState,
reducers:{
handleClass:(state,action)=>
{
state.classes=action.payload
}
},
extraReducers:(builder)=>
{

}
})
export const {handleClass}=flightSearch.actions
export default flightSearch.reducer