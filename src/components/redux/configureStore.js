import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
const configureStore = (insitalState) => {
    const composeEnhancers = (global.window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    return createStore(reducer, insitalState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())))

}

export default configureStore;