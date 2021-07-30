import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {ReduxActions, ReduxActionTypes} from '../../types/redux'

const defaultState={
    info: {},
    works: {}
}

export default function  indexReducer(state=defaultState, action: ReduxActions){
    switch (action.type){
        case ReduxActionTypes.SET_INFO:
            return {...state, info: action.payload}
        case ReduxActionTypes.SET_WORKS:
            return {...state, works: action.payload}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    index: indexReducer
})
export const store=createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof rootReducer>