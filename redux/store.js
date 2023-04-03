import { legacy_createStore as createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunk from 'redux-thunk'
import rootReducer from "./reducers"

const initialState = {}

const middleware = [thunk]

// We create the store passing the rootReducer as first parameter, the initial state, and then the middlewares inside composewithdevtools so we can have a better look at the app state through redux dev tools chrome extension
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store