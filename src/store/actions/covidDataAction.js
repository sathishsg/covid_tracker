import { API_URL } from '../../screens/utils/config';
import * as Action from '../ActionStrings'
export const covidDataAction = () => (dispatch) => {
    return new Promise(() => {
        dispatch(fetchCovidDataPending());
        Promise.all([
            fetch(API_URL.data).then(resp => resp.json()),
            fetch(API_URL.time_series).then(resp => resp.json()),
          ]).then((response) => {
            if(response.length > 0){
                dispatch(fetchCovidDataSuccess(response));
            }
        })
        .catch((error) => {
            dispatch(fetchCovidDataError(error));
        })
    })
}

const fetchCovidDataPending = () => ({
    type: Action.COVID_DATA_PENDING,
    payload: {}
});

const fetchCovidDataSuccess = (response) => ({
    type: Action.COVID_DATA_SUCCESS,
    payload: response
});

const fetchCovidDataError = (error) => ({
    type: Action.COVID_DATA_ERROR,
    payload: error
});