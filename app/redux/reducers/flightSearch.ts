import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Fuse from 'fuse.js';
import AirportsData from "../../components/jsonData/Airports.json"
import axios, { CancelTokenSource } from "axios";
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
    airportOriginLoading: boolean,
    desRes:boolean,
    originSelectedAirport:{
        name: string;
        iataCode: string;
        address: { cityName: string; countryName: string }
    }[],
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
    airportOriginLoading: false,
    desRes:false,
    originSelectedAirport:[]
}
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
let airportSearchController: CancelTokenSource | null = null;
export const searchAirport = createAsyncThunk(
    'flightSearch/searchAirport',
    async (query: string) => {
        if (airportSearchController) {
            airportSearchController.cancel("Request canceled due to new search");
        }

        const source = axios.CancelToken.source();
        airportSearchController = source;

        try {
            const response = await axios.post(
                "https://us-central1-tripfriday-2b399.cloudfunctions.net/paymentApi/airportSearch",
                { keyword: query, subType: "CITY,AIRPORT", page: 0 },
                { cancelToken: source.token }
            );

            const data = response?.data?.data || [];
            const uniqueResults = data.reduce((unique: any[], current: { iataCode: any; subType: string; }) => {
                const existingIndex = unique.findIndex(item => item.iataCode === current.iataCode);
                if (existingIndex === -1) {
                    unique.push(current);
                } else if (unique[existingIndex].subType === "CITY" && current.subType === "AIRPORT") {
                    unique[existingIndex] = current;
                }
                return unique;
            }, []);

            return uniqueResults;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled:", error.message);
            } else {
                throw error;
            }
        }
    }
);

export const debouncedSearchAirport = debounce((dispatch: any, getState: Function, query: string) => {

    if (query.trim() !== "") {
        const localResults = fuse.search(query);
        if (localResults.length <= 0) {
            dispatch(searchAirport(query));
        } else {

            dispatch(flightSearch.actions.selectdestination(localResults.map((res, r) => {
                var item = res.item;
                return {
                    name: item.name,
                    iataCode: item.iataCode,
                    address: {
                        cityName: item.cityName,
                        countryName: item.countryName
                    }
                };

            })));
        }
    }
    else {
        dispatch(flightSearch.actions.handleState())
    }
}, 500);
// const airportKeywordReq = (keyword:string) => {
//     if (abortAirportController) {
//       abortAirportController.abort();
//     }
//     abortAirportController = new AbortController();
//     console.log(`Req for`, keyword);
//     return axios.post(
//       "https://us-central1-tripfriday-2b399.cloudfunctions.net/paymentApi/airportSearch",
//       { keyword, subType: "CITY,AIRPORT", page: 0 },
//       { signal: abortAirportController.signal }
//     );
//   };

const fuse = new Fuse(AirportsData, {
    keys: ["cityName", "name", "iataCode", "countryName"],
    includeScore: true,
    threshold: 0.2
});
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
                const query = action.payload.e.trim();
                const loading = query !== "" ? true : false;
                return {
                    ...state,
                    [action.payload.name]: action.payload.e,
                    airportOriginLoading: loading,
                    desRes:loading,
                    airportOriginData:[]
                }
            },
            selectdestination: (state, action) => {
                state.airportOriginLoading = false;
                state.airportOriginData = action.payload;
            },
            handleState: (state) => {
                state.airportOriginLoading = false
            },
            //               handle1:(state)=>
            //               {
            // state.airportOriginLoading=false
            //               },
            //               handle2:(state)=>
            //               {
            //                 state.airportOriginLoading=true
            //               },
            // selectdestination: (state, action) => {
            //    state.airportOriginLoading=true
            //     const debouncedSearch = debounce(async (query: string) => {
            //         if (query !== "") {
            //             try {
            //                 const results = fuse.search(query);
            //                 console.log(results)
            //                 if (results.length > 0) {
            //                     var data = results.map((res, r) => {
            //                         var item = res.item;
            //                         return {
            //                             name: item.name,
            //                             iataCode: item.iataCode,
            //                             address: {
            //                                 cityName: item.cityName,
            //                                 countryName: item.countryName
            //                             }
            //                         };
            //                     });
            //                     state.airportOriginData = data
            //                     state.airportOriginLoading = true
            //                 }
            //                 else{
            //                     let data=await airportKeywordReq(action.payload)
            //                     console.log(data,"other==============1")
            //                     state.airportOriginData = data?.data?.data,
            //                     state.airportOriginLoading = false
            //                 }
            //             } catch (error) {
            //                 console.log(error,"kjkj")
            //             }

            //         }
            //         else {
            //             if (abortAirportController) {
            //               abortAirportController.abort();
            //             }
            //                 state.airportOriginData= [],
            //                 state.airportOriginLoading = false
            //           }
            //         //   state.airportOriginData = data
            //           state.airportOriginLoading = false
            //     }, 500)
            //     debouncedSearch(action.payload);
            // },
handleOriginSelectedAirPort:(state,action)=>
{
    return{
    ...state,
    originSelectedAirport:action.payload,
    desRes:!state.desRes,
    origin:'',
    departure:''
    }
}
        },

        extraReducers: (builder) => {
            builder.addCase(searchAirport.fulfilled, (state, action) => {
                state.airportOriginLoading = false;
                state.airportOriginData = action.payload;
            });

            builder.addCase(searchAirport.pending, (state) => {
                state.airportOriginLoading = true;
            });

            builder.addCase(searchAirport.rejected, (state) => {
                state.airportOriginLoading = false;
                state.airportOriginData = [];
            });
        },
    })
export const selectDestinationWithDebounce = (query: string) => (dispatch: any, getState: any) => {
    debouncedSearchAirport(dispatch, getState, query);
};
export const { handleClass, handleDropDownState, handleDepartureDateChange, handleReturnDateChange, handleChangeTextInput,handleOriginSelectedAirPort} = flightSearch.actions
export default flightSearch.reducer


