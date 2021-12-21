import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import covidDataReducer from "../reducers/covidDataReducer";
const middlewares = [thunk];

const appReducer = combineReducers({
    covidDataReducer: covidDataReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

const Store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares)),
);

export default Store;