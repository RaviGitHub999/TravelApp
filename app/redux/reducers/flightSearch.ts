import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const initialState={
origin:"",
destination:"",
departure:"Departure Date",
returnDate:"Return Date",
adults:0,
children:0,
infants:0,
classes:"Economy",
directflight:false,
dateValue:new Date(),
returnDateValue:new Date()
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
   
    const formattedDate = action.payload.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      state.departure=formattedDate
      state.dateValue=action.payload
}
},
handleReturnDateChange :(state,action)=>
{
    console.log(action.payload,"lkjh")
if(action.payload)
{
   
    const formattedDate = action.payload.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      state.returnDate=formattedDate
      state.returnDateValue=action.payload
}
}
},
extraReducers:(builder)=>
{

}
})
export const {handleClass,handleDropDownState,handleDepartureDateChange,handleReturnDateChange}=flightSearch.actions
export default flightSearch.reducer