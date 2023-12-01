import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const initialState={
origin:"",
destination:"",
departure:new Date(),
returnDate:new Date(),
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
},
handleDropDownState:(state,action)=>
{
switch (action.payload.stateName) {
    case "adults":
        state.adults=action.payload.stateValue
        break;
        case "children":
            state.children=action.payload.stateValue
            break;
            case "infants":
                state.infants=action.payload.stateValue
                break;
    default:
        break;
}
},
handleDepartureDateChange :(state,action)=>
{
    console.log(action.payload,"lkjh")
if(action.payload)
{
    state.departure=action.payload
}
}
},
extraReducers:(builder)=>
{

}
})
export const {handleClass,handleDropDownState,handleDepartureDateChange}=flightSearch.actions
export default flightSearch.reducer