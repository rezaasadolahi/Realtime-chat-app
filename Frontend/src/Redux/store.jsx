import { legacy_createStore, applyMiddleware, compose } from 'redux'
import MainReducer from './Reducer/MainReducer'
import thunk from 'redux-thunk'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default legacy_createStore(MainReducer, composeEnhancers(applyMiddleware(thunk)))