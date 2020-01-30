import { createStore, combineReducers } from "redux";
import objs from "../reducers/objReducer";
import svg from "../reducers/svgReducer";

export default createStore(combineReducers({ objs, svg }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())