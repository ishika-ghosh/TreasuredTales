import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";

const middleware = compose(applyMiddleware(thunkMiddleware));
const store = createStore(reducers, middleware);
export default store;
