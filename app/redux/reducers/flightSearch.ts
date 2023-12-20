import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Fuse from 'fuse.js';
import AirportsData from "../../components/jsonData/Airports.json"
import axios, { CancelTokenSource } from "axios";
import networkCall from "../../utils/networkCall";
import firestore from '@react-native-firebase/firestore';
interface NetworkState {
    getState: Function,
    fulfillWithValue: Function,
    rejectWithValue: Function
}
export interface SelectedFlightObj {
    name: string;
    iataCode: string;
    address: { cityName: string; countryName: string }
}
interface FlightSearchParameters {
    adults: number,
    child: number,
    infant: number,
    directFlight: boolean,
    oneStopFlight: boolean,
    journeyType: string,
    preferredAirlines: null,
    sources: null,
    segments: {
        Origin: SelectedFlightObj,
        Destination: SelectedFlightObj,
        FlightCabinClass: string,
        PreferredDepartureTime: Date,
        PreferredArrivalTime: Date,
    }[]
}
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
    oneStopFlight: boolean,
    dateValue: Date,
    returnDateValue: Date,
    airportOriginData: SelectedFlightObj[],
    airportOriginLoading: boolean,
    desRes: boolean,
    oriRes: boolean,
    originSelectedAirport: SelectedFlightObj,
    destinationSelectedAirPort: SelectedFlightObj,
    airportDestinationData: SelectedFlightObj[],
    airportDestinationLoading: boolean,
    originselected: boolean,
    destinationselected: boolean,
    journeyWay: string,
    outbound: string,
    inbound: string,
    cabinClassId: string,
    departureformattedDate: string,
    returnformattedDate: string,
    flightsData: any[],
    flightSearchLoading: boolean,
    airlinelogos: [],
    status: string,
    error: any,
    RemainingFlights:any,
    showFilters:boolean,
    flightsNamesList:[]
}
const initialState: InitialState = {
    origin: "",
    destination: "",
    departure: "Departure Date",
    returnDate: "Return Date",
    adults: 1,
    children: 0,
    infants: 0,
    classes: "Economy",
    directflight: false,
    oneStopFlight: false,
    dateValue: new Date(),
    returnDateValue: new Date(),
    airportOriginData: [],
    airportOriginLoading: false,
    desRes: false,
    oriRes: false,
    originSelectedAirport: {
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
    originselected: false,
    destinationselected: false,
    journeyWay: "1",
    outbound: "",
    inbound: "",
    cabinClassId: "1",
    departureformattedDate: "",
    returnformattedDate: "",
    flightsData: [],
    flightSearchLoading: false,
    airlinelogos: [],
    status: 'idle',
    error: null,
    RemainingFlights:[],
    showFilters:false,
    flightsNamesList:[]
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
export const flightSearching = createAsyncThunk("fetching Flights Data", async (_, { getState, fulfillWithValue, rejectWithValue }: NetworkState) => {

    const { outbound, inbound, cabinClassId, oneStopFlight, originSelectedAirport, destinationSelectedAirPort, journeyWay, adults, children, infants, directflight } = getState().flightReducer
    let request: any = {
        adults,
        child: children,
        infant: infants,
        directFlight: directflight,
        oneStopFlight,
        journeyType: journeyWay,
        preferredAirlines: null,
        sources: null,
        segments: []
    };
    var segments: { Origin: any; Destination: any; FlightCabinClass: any; PreferredDepartureTime: any; PreferredArrivalTime: any; }[] = [];
    if (journeyWay === "2") {
        segments = [
            {
                Origin: originSelectedAirport.iataCode,
                Destination: destinationSelectedAirPort.iataCode,
                FlightCabinClass: cabinClassId,
                PreferredDepartureTime: outbound,
                PreferredArrivalTime: outbound,
            },
            {
                Origin: originSelectedAirport.iataCode,
                Destination: destinationSelectedAirPort.iataCode,
                FlightCabinClass: cabinClassId,
                PreferredDepartureTime: inbound,
                PreferredArrivalTime: inbound,
            }
        ];
    } else {
        segments = [
            {
                Origin: originSelectedAirport.iataCode,
                Destination: destinationSelectedAirPort.iataCode,
                FlightCabinClass: cabinClassId,
                PreferredDepartureTime: outbound,
                PreferredArrivalTime: outbound,
            }
        ];
    }
    request.segments = segments
    console.log("Search req", request);
    const data = JSON.stringify(request)
    const { response, error } = await networkCall(
        "https://us-central1-tripfriday-2b399.cloudfunctions.net/tboApi/flightSearch",
        "POST",
        data,
    );
    if (response) {
        return fulfillWithValue(response)
    }
    else {
        return rejectWithValue(error)
    }

})

export const fetchFlightsLogos = createAsyncThunk(
    'flightsLogos/fetchFlightsLogos',
    async () => {
        const querySnapshot = await firestore().collection("airlinelogos").get();
        let updatedAirlinelogos: any = [];

        querySnapshot.forEach(snapshot => {
            updatedAirlinelogos.push({ id: snapshot.id, url: snapshot.data().url });
        });

        return updatedAirlinelogos;
    }
);

export const flightSearch = createSlice(
    {
        name: "flightSearch",
        initialState,
        reducers: {
            handleClass: (state, action) => {
                state.classes = action.payload
                const classId = (() => {
                    switch (action.payload) {
                        case "Economy":
                            return "2";
                        case "Business":
                            return "4";
                        case "First":
                            return "6";
                        case "Premium Economy":
                            return "3";
                        case "Any cabin class":
                            return "1";
                        default:
                            return "1";
                    }
                })();
                state.cabinClassId = classId

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
                    state.departure = formattedDate,
                        state.departureformattedDate = formattedDate,
                        state.dateValue = action.payload
                    const inputDate = new Date(action.payload);
                    const dateString = inputDate.toISOString();
                    state.outbound = `${dateString.split("").slice(0, dateString.indexOf("T") + 1).join("")}00:00:00`
                }
            },
            handleReturnDateChange: (state, action) => {
                if (action.payload) {

                    const formattedDate = action.payload.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    });
                    state.returnDate = formattedDate,
                        state.returnformattedDate = formattedDate
                    state.returnDateValue = action.payload
                    const inputDate = new Date(action.payload);
                    const dateString = inputDate.toISOString();
                    state.inbound = `${dateString.split("").slice(0, dateString.indexOf("T") + 1).join("")}00:00:00`

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
                    originselected: true
                }
            },
            handleDestinationSelectedAirPort: (state, action) => {
                return {
                    ...state,
                    destinationSelectedAirPort: action.payload,
                    desRes: !state.desRes,
                    destination: '',
                    destinationselected: true
                }
            },
            handleJourneyWay: (state, action) => {
                state.journeyWay = action.payload
            },
            handleFlightsFilter:(state,action)=>
            {
                state.showFilters=action.payload
            } ,
            handleFlightNmaes:(state,action)=>
            {
console.log(action.payload)
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

            builder.addCase(flightSearching.fulfilled, (state, action) => {
                state.flightsData = action.payload.flightResult.Response.Results,
                    state.flightSearchLoading = false
            });

            builder.addCase(flightSearching.pending, (state) => {
                state.flightSearchLoading = true
                console.log("pending")
            });

            builder.addCase(flightSearching.rejected, (state) => {
                state.flightSearchLoading = false
                state.flightsData = []
                console.log("rejected")
            });
            builder
                .addCase(fetchFlightsLogos.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetchFlightsLogos.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.airlinelogos = action.payload;
                })
                .addCase(fetchFlightsLogos.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                });


        },
    })
export const selectOriginWithDebounce = (query: string) => (dispatch: any, getState: any) => {
    debouncedSearchOriginAirport(dispatch, getState, query);
};
export const selectDestinationWithDebounce = (query: string) => (dispatch: Function, getState: Function) => {
    debouncedSearchDestinationAirport(dispatch, getState, query)
}
export const {handleFlightNmaes, handleClass, handleFlightsFilter, handleDropDownState, handleDepartureDateChange, handleReturnDateChange, handleDestinationSelectedAirPort, handleChangeOriginTextInput, handleOriginSelectedAirPort, handleChangeDestinationTextInput, handleJourneyWay } = flightSearch.actions
export default flightSearch.reducer


