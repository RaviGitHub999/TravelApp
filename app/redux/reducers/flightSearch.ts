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
    desRes: boolean,
    oriRes: boolean,
    originSelectedAirport: {
        name: string;
        iataCode: string;
        address: { cityName: string; countryName: string }
    },
    destinationSelectedAirPort: {
        name: string;
        iataCode: string;
        address: { cityName: string; countryName: string }
    },
    airportDestinationData: {
        name: string;
        iataCode: string;
        address: { cityName: string; countryName: string }
    }[],
    airportDestinationLoading: boolean,
    originselected:boolean,
    destinationselected:boolean,
    journeyWay:string
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
    desRes: false,
    oriRes: false,
    originSelectedAirport:{
        name: "",
        iataCode: "",
        address: {
            cityName: "",
            countryName: ""
        }
    },
    destinationSelectedAirPort: {
        name: "",
        iataCode: "",
        address: {
            cityName: "",
            countryName: ""
        }
    },
    airportDestinationData: [],
    airportDestinationLoading: false,
    originselected:false,
    destinationselected:false,
    journeyWay:"1"
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
const fuse = new Fuse(AirportsData, {
    keys: ["cityName", "name", "iataCode", "countryName"],
    includeScore: true,
    threshold: 0.2
});
let airportSearchController: CancelTokenSource | null = null;
export const searchOriginAirport = createAsyncThunk(
    'flightSearch/searchOriginAirport',
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

export const debouncedSearchOriginAirport = debounce((dispatch: any, getState: Function, query: string) => {

    if (query.trim() !== "") {
        const localResults = fuse.search(query);
        if (localResults.length <= 0) {
            dispatch(searchOriginAirport(query));
        } else {

            dispatch(flightSearch.actions.selectOrigin(localResults.map((res, r) => {
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
        dispatch(flightSearch.actions.handleairportOriginLoading())
    }
}, 500);

export const searchDestinationAirport = createAsyncThunk(
    'flightSearch/searchDestinationAirport',
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
export const debouncedSearchDestinationAirport = debounce((dispatch: any, getState: Function, query: string) => {

    if (query.trim() !== "") {
        const localResults = fuse.search(query);
        if (localResults.length <= 0) {
            dispatch(searchDestinationAirport(query));
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
        dispatch(flightSearch.actions.handleairportDestinationLoading())
    }
}, 500);
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
                    console.log(action.payload,"==========")
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
                    console.log(action.payload,"==========",new Date())
                }
            },
            handleChangeOriginTextInput: (state, action) => {
                const query = action.payload.e.trim();
                const loading1 = query !== "" ? true : false;
                return {
                    ...state,
                    [action.payload.name]: action.payload.e,
                    airportOriginLoading: loading1,
                    oriRes: loading1,
                    airportOriginData: [],
                }
            },
            handleChangeDestinationTextInput: (state, action) => {
                const query = action.payload.e.trim();
                const loading = query !== "" ? true : false;
                return {
                    ...state,
                    [action.payload.name]: action.payload.e,
                    airportDestinationLoading: loading,
                    desRes: loading,
                    airportDestinationData: [],
                }
            },
            selectOrigin: (state, action) => {
                state.airportOriginLoading = false;
                state.airportOriginData = action.payload;
            },
            handleairportOriginLoading: (state) => {
                state.airportOriginLoading = false
            },
            selectdestination: (state, action) => {
                state.airportDestinationLoading = false;
                state.airportDestinationData = action.payload;
            },
            handleairportDestinationLoading: (state) => {
                state.airportOriginLoading = false
            },

            handleOriginSelectedAirPort: (state, action) => {
                return {
                    ...state,
                    originSelectedAirport: action.payload,
                    oriRes: !state.oriRes,
                    origin: '',
                    originselected:true
                }
            },
            handleDestinationSelectedAirPort: (state, action) => {
                return {
                    ...state,
                    destinationSelectedAirPort: action.payload,
                    desRes: !state.desRes,
                    destination: '',
                    destinationselected:true
                }
            },
            handleJourneyWay:(state,action)=>
            {
state.journeyWay=action.payload
            }
        },

        extraReducers: (builder) => {
            builder.addCase(searchOriginAirport.fulfilled, (state, action) => {
                state.airportOriginLoading = false;
                state.airportOriginData = action.payload;
            });

            builder.addCase(searchOriginAirport.pending, (state) => {
                state.airportOriginLoading = true;
            });

            builder.addCase(searchOriginAirport.rejected, (state) => {
                state.airportOriginLoading = false;
                state.airportOriginData = [];
            });
            builder.addCase(searchDestinationAirport.fulfilled, (state, action) => {
                state.airportDestinationLoading = false;
                state.airportDestinationData = action.payload;
            });

            builder.addCase(searchDestinationAirport.pending, (state) => {
                state.airportDestinationLoading = true;
            });

            builder.addCase(searchDestinationAirport.rejected, (state) => {
                state.airportDestinationLoading = false;
                state.airportDestinationData = [];
            });
        },
    })
export const selectOriginWithDebounce = (query: string) => (dispatch: any, getState: any) => {
    debouncedSearchOriginAirport(dispatch, getState, query);
};
export const selectDestinationWithDebounce = (query: string) => (dispatch: Function, getState: Function) => {
    debouncedSearchDestinationAirport(dispatch, getState, query)
}
export const { handleClass, handleDropDownState, handleDepartureDateChange, handleReturnDateChange, handleDestinationSelectedAirPort, handleChangeOriginTextInput, handleOriginSelectedAirPort, handleChangeDestinationTextInput,handleJourneyWay} = flightSearch.actions
export default flightSearch.reducer


