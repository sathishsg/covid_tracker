import StateCovidData from '../../objects/StateCovidData';
import * as Action from '../ActionStrings'

const initialState = {
    covidData: []
}

function covidDataReducer(state = initialState, action){
    switch(action.type){
        case Action.COVID_DATA_PENDING:
            return {
                ...state,
                isFetchingPending: true,
                isError: false,
            };
        case Action.COVID_DATA_SUCCESS:
            return {
                ...state,
                covidData: processData(action.payload),
                isFetchingPending: false,
                isError: false,
            };
        case Action.COVID_DATA_ERROR:
            return {
                ...state,
                error: action.payload,
                isFetchingPending: false,
                isError: true,
            };
        default: 
            return state;
    }
}

function processData(response) {
    const statesObject = response[0]
    const statesDateObject = response[1]
    const keys = Object.keys(statesObject)
    const statesData = []
    keys?.map((key, index) => {
        const stateObject = new StateCovidData();
        stateObject.mapFromStateCovidDataJson(statesObject[key]);
        stateObject.name = key;
        stateObject.mapFromStateDatesJson(statesDateObject[key])
        statesData.push(stateObject);
        return true;
    })
    return statesData;
}

export default covidDataReducer;