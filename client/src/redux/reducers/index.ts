import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {ReduxActions, ReduxActionTypes} from '../../types/redux'

const defaultState={
    isAuth: false,
    info: {} as IInfo,
    works: [] as unknown as IWork,
    isWorksModal: false,
    isAuthModal: false,
    editWork: {mark: [], link:{github: '', demo:''}} as unknown as IWork,
    errors: [] as unknown as Array<any>,
}
export type IWork={
    _id: string,
    name:string,
    desc:string,
    tags: Array<any>
    mark: Array<any>
    links: {github: any, demo: any}
}
export type IInfo={
    name: string,
    job: string,
    desc: string,
    workWidth: string,
    workWidthTittle: string,
    contacts: Array<any>
}
export default function  indexReducer(state=defaultState, action: ReduxActions){
    switch (action.type){
        case ReduxActionTypes.IS_AUTH:
            return {...state, isAuth: !state.isAuth}
        case ReduxActionTypes.SET_INFO:
            return {...state, info: action.payload}
        case ReduxActionTypes.ADD_CONTACT:
            return {...state, info: {...state.info,
                    contacts: [...state.info.contacts, {key: action.payload.key, value: action.payload.value}]}}
        case ReduxActionTypes.ADD_MARK:
            return {...state, editWork: {...state.editWork,
                    mark: [...state.editWork.mark, action.payload]}}
        case ReduxActionTypes.REMOVE_MARK:
            return {...state, editWork: {...state.editWork,
                    mark: [...state.editWork.mark.filter(mark=>mark!==action.payload)]}}
        case ReduxActionTypes.REMOVE_CONTACT:
            return {...state, info: {...state.info,
                    contacts: [...state.info.contacts.filter(contact=>contact!==action.payload)]}}
        case ReduxActionTypes.SET_WORKS:
            return {...state, works: action.payload}
        case ReduxActionTypes.IS_MODAL_WORKS:
            return {...state, isWorksModal: !state.isWorksModal}
        case ReduxActionTypes.IS_AUTH_MODAL:
            return {...state, isAuthModal: !state.isAuthModal}
        case ReduxActionTypes.ADD_ERROR:
            return {...state, errors: [...state.errors, action.payload]}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    index: indexReducer
})
export const store=createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof rootReducer>