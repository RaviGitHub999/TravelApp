import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Fuse from 'fuse.js';
import AirportsData from "../../components/jsonData/Airports.json"
import axios from "axios";
interface InitialState {
    origin: string,
    destination: string,
    departure: string,
    returnDate: string,
    adults: number,
    children: number,
    infants: number,
    classes: string,
    directflight: boolean,
    dateValue: Date,
    returnDateValue: Date,
    airportOriginData: {
        name: string;
        iataCode: string;
        address: { cityName: string; countryName: string }
    }[],
    airportOriginLoading: boolean
}
const initialState: InitialState = {
    origin: "",
    destination: "",
    departure: "Departure Date",
    returnDate: "Return Date",
    adults: 0,
    children: 0,
    infants: 0,
    classes: "Economy",
    directflight: false,
    dateValue: new Date(),
    returnDateValue: new Date(),
    airportOriginData: [],
    airportOriginLoading: false
}
let abortAirportController:AbortController
const airportKeywordReq = (keyword:string) => {
    if (abortAirportController) {
      abortAirportController.abort();
    }
    abortAirportController = new AbortController();
    console.log(`Req for`, keyword);
    return axios.post(
      "https://us-central1-tripfriday-2b399.cloudfunctions.net/paymentApi/airportSearch",
      { keyword, subType: "CITY,AIRPORT", page: 0 },
      { signal: abortAirportController.signal }
    );
  };

// const fuse = new Fuse(AirportsData, {
//     keys: ["cityName", "name", "iataCode", "countryName"],
//     includeScore: true,
//     threshold: 0.2
// });
const fuse = new Fuse(AirportsData, {
    keys: ["cityName", "name", "iataCode", "countryName"],
    includeScore: true,
    threshold: 0.2,
  });
type DebounceFunction = (cb: Function, delay: number) => (...args: any[]) => void;

const debounce: DebounceFunction = (cb, delay) => {
    let timer: NodeJS.Timeout;

    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            cb(...args);
        }, delay);
    };
};
export const flightSearch = createSlice(
    {
        name: "flightSearch",
        initialState,
        reducers: {
            handleClass: (state, action) => {
                state.classes = action.payload
            },
            handleDropDownState: (state, action) => {
                switch (action.payload.stateName) {
                    case "adults":
                        state.adults = action.payload.stateValue
                        break;
                    case "children":
                        state.children = action.payload.stateValue
                        break;
                    case "infants":
                        state.infants = action.payload.stateValue
                        break;
                    default:
                        break;
                }
            },
            handleDepartureDateChange: (state, action) => {
                if (action.payload) {

                    const formattedDate = action.payload.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    });
                    state.departure = formattedDate
                    state.dateValue = action.payload
                }
            },
            handleReturnDateChange: (state, action) => {
                if (action.payload) {

                    const formattedDate = action.payload.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    });
                    state.returnDate = formattedDate
                    state.returnDateValue = action.payload
                }
            },
            handleChangeTextInput: (state, action) => {

                return {
                    ...state,
                    [action.payload.name]: action.payload.e,
                    airportOriginLoading: true
                }
            },
          
            selectdestination: (state, action) => {
                const debouncedSearch = debounce(async (query: string) => {
                    if (query !== "") {
                        try {
                            const results = fuse.search(query);
                            console.log(results)
                            if (results.length > 0) {
                                var data = results.map((res, r) => {
                                    var item = res.item;
                                    return {
                                        name: item.name,
                                        iataCode: item.iataCode,
                                        address: {
                                            cityName: item.cityName,
                                            countryName: item.countryName
                                        }
                                    };
                                });
                                state.airportOriginData = data
                                state.airportOriginLoading = false
                            }
                            else{
                                let data=await airportKeywordReq(action.payload)
                                console.log(data,"other==============1")
                            }
                        } catch (error) {
                            console.log(error,"kjkj")
                        }

                    }

                }, 500)
                debouncedSearch(action.payload);
            },
            
        },
       
        extraReducers: (builder) => {

        }
    })
export const { handleClass, handleDropDownState, handleDepartureDateChange, handleReturnDateChange, handleChangeTextInput, selectdestination } = flightSearch.actions
export default flightSearch.reducer


