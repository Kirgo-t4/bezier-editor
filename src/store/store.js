import { createStore, combineReducers } from "redux";
import objs from "../reducers/objReducer";

export default createStore(combineReducers({ objs }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())