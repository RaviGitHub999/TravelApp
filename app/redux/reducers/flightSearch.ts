
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Fuse from 'fuse.js';
import AirportsData from "../../components/jsonData/Airports.json"
import axios, { CancelTokenSource } from "axios";
import networkCall from "../../utils/networkCall";
import firestore from '@react-native-firebase/firestore';

const cabinclassMap: { [key: number]: string } = {
    1: "Any cabin class",
    2: "Economy",
    3: "Premium Economy",
    4: "Business",
    5: "Premium Business class",
    6: "First"
};

interface NetworkState {
    getState: Function,
    fulfillWithValue: Function,
    rejectWithValue: Function
}
interface AirlineLogo {
    id: string;
    url: string;
    // Add other properties if needed
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
    flightResJType: number,
    outbound: string,
    inbound: string,
    cabinClassId: string,
    departureformattedDate: string,
    returnformattedDate: string,
    flightsData: any[],
    flightSearchToken: string
    flightSessionStarted: boolean,
    flightSessionExpired: boolean,
    internationalFlights: boolean,
    flightSearchLoading: boolean,
    airlinelogos: [],
    status: string,
    error: any,
    RemainingFlights: any,
    showFilters: boolean,
    flightsNamesList: any[],
    singleSigment: any[],
    flightLogo: string | null,
    filters: {
        selectFlightName: string | null
    },
    filteredFlightsData: any[],
    flightArr:any
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
    flightResJType: 0,
    outbound: "",
    inbound: "",
    cabinClassId: "1",
    departureformattedDate: "",
    returnformattedDate: "",
    flightsData: [],
    flightSearchToken: "",
    flightSessionStarted: false,
    flightSessionExpired: false,
    internationalFlights: false,
    flightSearchLoading: false,
    airlinelogos: [],
    status: 'idle',
    error: null,
    RemainingFlights: [],
    showFilters: false,
    flightsNamesList: [],
    singleSigment: [],
    flightLogo: "",
    filters: {
        selectFlightName: null
    },
    filteredFlightsData: [],
    flightArr:[]
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
        console.log(response, "response")
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
const diffMinutes = (dateStr1: string, dateStr2: string): number => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    const diff = date2.getTime() - date1.getTime();

    const diffMinutes = Math.floor(diff / (1000 * 60));

    return diffMinutes;
};
const diffDays = (dateStr1: Date, dateStr2: Date): number => {
    const date1 = new Date(
      `${dateStr1.getMonth() + 1}/${dateStr1.getDate()}/${dateStr1.getFullYear()}`
    );
    const date2 = new Date(
      `${dateStr2.getMonth() + 1}/${dateStr2.getDate()}/${dateStr2.getFullYear()}`
    );

    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};
export const modifyFlightObject=(flight:any)=>
{

var totalDuration = 0;
let segments = flight.Segments.map((segment:any) => {
let seg1 = segment[0];
let segLast = segment[segment.length - 1];

let originCityName = seg1.Origin.Airport.CityName;
let originAirportCode = seg1.Origin.Airport.AirportCode;
let originAirportName = seg1.Origin.Airport.AirportName;
let originTerminal = seg1.Origin.Airport.Terminal;

let destCityName = segLast.Destination.Airport.CityName;
let destAirportCode = segLast.Destination.Airport.AirportCode;
let destAirportName = segLast.Destination.Airport.AirportName;
let destTerminal = segLast.Destination.Airport.Terminal;

let depTimeDate = new Date(seg1.Origin.DepTime);
let arrTimeDate = new Date(segLast.Destination.ArrTime);

let depTimeArr = seg1.Origin.DepTime.split("T")[1].split(":");
let arrTimeArr = segLast.Destination.ArrTime.split("T")[1].split(":");
let depTime = `${depTimeArr[0]}:${depTimeArr[1]}`
let arrTime = `${arrTimeArr[0]}:${arrTimeArr[1]}`;

let durationSum = 0;

let stopOverPts:any[] = [];
let charNum = 0;

let segRoutes:any[] = [];

let dur = 0;
let flightCodes:any[] = [];

segment.forEach((seg:any, s:number) => {
let flightCode = `${seg.Airline.AirlineCode} - ${seg.Airline.FlightNumber} ${seg.Airline.FareClass}`;
flightCodes[s] = flightCode;

let flightDuration =
  seg.Duration !== 0 ? seg.Duration : seg.AccumulatedDuration;

dur += flightDuration + seg.GroundTime;

durationSum += flightDuration;

if (s > 0) {
  let currDepTime = seg.Origin.DepTime;
  let prevArrTime = segment[s - 1].Destination.ArrTime;

  let diffMin = diffMinutes(
    prevArrTime,
    currDepTime
  );
  durationSum += diffMin;

  let stopDurationNum = diffMin / 60;
  let stopDurHours = Math.floor(stopDurationNum);
  let stopDurMins = Math.ceil(
    60 * (stopDurationNum - Math.floor(stopDurationNum))
  );
  var stopDuration:any= `${stopDurHours ? `${stopDurHours}h ` : ""}${stopDurMins !== 0 ? `${stopDurMins}m` : ""
    }`;

  charNum += seg.Origin.Airport.CityName.length;

  stopOverPts.push({
    cityName: seg.Origin.Airport.CityName,
    stopDuration,
    charNum
  });
}

let durNum = flightDuration / 60;
let durHrs = Math.floor(durNum);
let durMns = Math.ceil(60 * (durNum - Math.floor(durNum)));
let durationStr = `${durHrs ? `${durHrs}h ` : ""}${durMns !== 0 ? `${durMns}m` : ""
  }`;

let dpTimeStr = seg.Origin.DepTime;
let arTimeStr = seg.Destination.ArrTime;

let depDate = new Date(dpTimeStr);
let arrDate = new Date(arTimeStr);

let dpTimeArr = dpTimeStr.split("T")[1].split(":");
let arTimeArr = arTimeStr.split("T")[1].split(":");
let dpTime = `${dpTimeArr[0]}:${dpTimeArr[1]}`;
let arTime = `${arTimeArr[0]}:${arTimeArr[1]}`;

segRoutes.push({
  originCode: seg.Origin.Airport.AirportCode,
  destCode: seg.Destination.Airport.AirportCode,
  flightDur: durationStr,
  layoverDur: stopDuration?stopDuration : null,
  depTime: dpTime,
  arrTime: arTime,
  arrAfterDays:diffDays(depDate, arrDate),
  arrCity: seg.Origin.Airport.CityName,
  destCity: seg.Destination.Airport.CityName
});
});

let cabinClass = cabinclassMap[segment[0].CabinClass];
let durationNum = durationSum / 60;
let durHours = Math.floor(durationNum);
let durMins = Math.ceil(60 * (durationNum - Math.floor(durationNum)));
let duration = `${durHours ? `${durHours}h ` : ""}${durMins !== 0 ? `${durMins}m` : ""
}`;

let arrAfterDays = diffDays(
depTimeDate,
arrTimeDate
);

totalDuration += dur;

return {
airlineName: seg1.Airline.AirlineName,
mainFlgtCode: flightCodes[0],
flightCodes,
arrTime,
arrTimeDate,
depTime,
depTimeDate,
arrAfterDays,
originCityName,
originAirportCode,
originAirportName,
originTerminal,
destCityName,
destAirportCode,
destAirportName,
destTerminal,
duration,
dur,
stopOverPts,
segRoutes,
baggage: seg1.Baggage,
cabinBaggage: seg1.CabinBaggage,
cabinClass
};
});

return {
segments,
fare: flight.Fare.OfferedFare
? Math.ceil(flight.Fare.OfferedFare)
: Math.ceil(flight.Fare.PublishedFare),
fareType: flight.FareClassification?.Type,
fareRules: flight.MiniFareRules ? flight.MiniFareRules : [],
resultIndex: flight.ResultIndex,
totalDuration
};  
}

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
            handleFlightsFilter: (state, action) => {
                state.showFilters = action.payload
            },
            handleFlightNames: (state) => {
                state.singleSigment.flat(1).map((ele) => {
                    if (!state.flightsNamesList.includes(ele.Airline.Airline)) {
                        state.flightsNamesList.push(ele)
                    }
                })

            },
            handleSelectFlightName: (state, action) => {
                if (state.filters.selectFlightName?.includes(action.payload)) {
                    state.filters.selectFlightName = null
                }
                else {
                    state.filters.selectFlightName = action.payload
                }
            },
            // applyFilters: (state) => {
            //     const { selectFlightName } = state.filters;

            //     state.singleSigment = state.sum.filter(item => {
            //       if (selectFlightName && item[0].Airline.AirlineName !== selectFlightName) {
            //         return false; // Exclude items with mismatched names
            //       }
            //     //   if (maxAge && item.age >= maxAge) {
            //     //     return false; // Exclude items with ages greater than or equal to maxAge
            //     //   }
            //     //   if (gender && item.gender !== gender) {
            //     //     return false; // Exclude items with mismatched genders
            //     //   }
            //       return true; // Include items that meet all filter criteria
            //     });
            //   }
            applyFilters: (state) => {
                const { selectFlightName } = state.filters;

                // Check if selectFlightName is defined
                if (selectFlightName) {
                    // Filter state.flightsData based on selectFlightName
                    state.filteredFlightsData = state.singleSigment.filter(item => item[0]?.Airline?.AirlineName === selectFlightName);
                } else {
                    // If selectFlightName is not defined, reset filteredFlightsData to the original state.flightsData
                    state.filteredFlightsData = [...state.singleSigment];
                }
            },
//             filterFlights:(state)=>
//             {
// console.log(state.flightsData.flat(1)[0].map((ele,index)=>ele))
//             },
            modifyFlightObject1: (state: InitialState, action: { payload: any }) =>
            {
                const flight = action.payload;
var totalDuration = 0;
let segments = flight.Segments.map((segment:any) => {
let seg1 = segment[0];
let segLast = segment[segment.length - 1];

let originCityName = seg1.Origin.Airport.CityName;
let originAirportCode = seg1.Origin.Airport.AirportCode;
let originAirportName = seg1.Origin.Airport.AirportName;
let originTerminal = seg1.Origin.Airport.Terminal;

let destCityName = segLast.Destination.Airport.CityName;
let destAirportCode = segLast.Destination.Airport.AirportCode;
let destAirportName = segLast.Destination.Airport.AirportName;
let destTerminal = segLast.Destination.Airport.Terminal;

let depTimeDate = new Date(seg1.Origin.DepTime);
let arrTimeDate = new Date(segLast.Destination.ArrTime);

let depTimeArr = seg1.Origin.DepTime.split("T")[1].split(":");
let arrTimeArr = segLast.Destination.ArrTime.split("T")[1].split(":");
let depTime = `${depTimeArr[0]}:${depTimeArr[1]}`
let arrTime = `${arrTimeArr[0]}:${arrTimeArr[1]}`;

let durationSum = 0;

let stopOverPts:any[] = [];
let charNum = 0;

let segRoutes:any[] = [];

let dur = 0;
let flightCodes:any[] = [];

segment.forEach((seg:any, s:number) => {
let flightCode = `${seg.Airline.AirlineCode} - ${seg.Airline.FlightNumber} ${seg.Airline.FareClass}`;
flightCodes[s] = flightCode;

let flightDuration =
  seg.Duration !== 0 ? seg.Duration : seg.AccumulatedDuration;

dur += flightDuration + seg.GroundTime;

durationSum += flightDuration;

if (s > 0) {
  let currDepTime = seg.Origin.DepTime;
  let prevArrTime = segment[s - 1].Destination.ArrTime;

  let diffMin = diffMinutes(
    prevArrTime,
    currDepTime
  );
  durationSum += diffMin;

  let stopDurationNum = diffMin / 60;
  let stopDurHours = Math.floor(stopDurationNum);
  let stopDurMins = Math.ceil(
    60 * (stopDurationNum - Math.floor(stopDurationNum))
  );
  var stopDuration:any= `${stopDurHours ? `${stopDurHours}h ` : ""}${stopDurMins !== 0 ? `${stopDurMins}m` : ""
    }`;

  charNum += seg.Origin.Airport.CityName.length;

  stopOverPts.push({
    cityName: seg.Origin.Airport.CityName,
    stopDuration,
    charNum
  });
}

let durNum = flightDuration / 60;
let durHrs = Math.floor(durNum);
let durMns = Math.ceil(60 * (durNum - Math.floor(durNum)));
let durationStr = `${durHrs ? `${durHrs}h ` : ""}${durMns !== 0 ? `${durMns}m` : ""
  }`;

let dpTimeStr = seg.Origin.DepTime;
let arTimeStr = seg.Destination.ArrTime;

let depDate = new Date(dpTimeStr);
let arrDate = new Date(arTimeStr);

let dpTimeArr = dpTimeStr.split("T")[1].split(":");
let arTimeArr = arTimeStr.split("T")[1].split(":");
let dpTime = `${dpTimeArr[0]}:${dpTimeArr[1]}`;
let arTime = `${arTimeArr[0]}:${arTimeArr[1]}`;

segRoutes.push({
  originCode: seg.Origin.Airport.AirportCode,
  destCode: seg.Destination.Airport.AirportCode,
  flightDur: durationStr,
  layoverDur: stopDuration?stopDuration : null,
  depTime: dpTime,
  arrTime: arTime,
  arrAfterDays:diffDays(depDate, arrDate),
  arrCity: seg.Origin.Airport.CityName,
  destCity: seg.Destination.Airport.CityName
});
});

let cabinClass = cabinclassMap[segment[0].CabinClass];
let durationNum = durationSum / 60;
let durHours = Math.floor(durationNum);
let durMins = Math.ceil(60 * (durationNum - Math.floor(durationNum)));
let duration = `${durHours ? `${durHours}h ` : ""}${durMins !== 0 ? `${durMins}m` : ""
}`;

let arrAfterDays = diffDays(
depTimeDate,
arrTimeDate
);

totalDuration += dur;

return {
airlineName: seg1.Airline.AirlineName,
mainFlgtCode: flightCodes[0],
flightCodes,
arrTime,
arrTimeDate,
depTime,
depTimeDate,
arrAfterDays,
originCityName,
originAirportCode,
originAirportName,
originTerminal,
destCityName,
destAirportCode,
destAirportName,
destTerminal,
duration,
dur,
stopOverPts,
segRoutes,
baggage: seg1.Baggage,
cabinBaggage: seg1.CabinBaggage,
cabinClass
};
});

return {
    ...state,
    flightArr: [
      ...state.flightArr,
      {
        segments,
        fare: flight.Fare.OfferedFare
          ? Math.ceil(flight.Fare.OfferedFare)
          : Math.ceil(flight.Fare.PublishedFare),
        fareType: flight.FareClassification?.Type,
        fareRules: flight.MiniFareRules ? flight.MiniFareRules : [],
        resultIndex: flight.ResultIndex,
        totalDuration,
      },
    ],
  }; 
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
                state.flightsData = action.payload.flightResult.Response.Results
                state.flightSearchToken = action.payload.flightResult.tokenId
                state.flightSearchLoading = false
                state.flightSessionStarted = true
                // setTimeout(() => {
                //         state.flightSessionStarted = false,
                //         state.flightSessionExpired = true
                // }, 840000);
                state.internationalFlights = action.payload.flightResult.Response.Results.length > 1 ? false : true
                // state.singleSigment = state.flightsData.map((ele) => ele[0].Segments.flat(1))
                state.filteredFlightsData = state.flightsData
                // state.flightsNamesList = Array.from(new Set(state.singleSigment.flat(1).map(ele => ele.Airline.AirlineName)))
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
export const { modifyFlightObject1,handleSelectFlightName, applyFilters, handleFlightNames, handleClass, handleFlightsFilter, handleDropDownState, handleDepartureDateChange, handleReturnDateChange, handleDestinationSelectedAirPort, handleChangeOriginTextInput, handleOriginSelectedAirPort, handleChangeDestinationTextInput, handleJourneyWay } = flightSearch.actions
export default flightSearch.reducer


