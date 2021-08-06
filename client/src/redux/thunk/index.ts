import {ReduxActionTypes} from '../../types/redux'
import {indexAPI} from '../../API'

export const get = () => {
    return async (dispatch: any) => {
        try {
            const responseInfo = await indexAPI.getInfo()
            const responseWorks = await indexAPI.getWorks()
            dispatch(
                {
                    type: ReduxActionTypes.SET_INFO,
                    payload: responseInfo.data
                })
            dispatch(
                {
                    type: ReduxActionTypes.SET_WORKS,
                    payload: responseWorks.data
                })
        } catch (e) {
            console.log(e)
        }
    }
}

export const addWork = (data: any) => {
    return async (dispatch: any) => {
        try {
            const response = await indexAPI.addWork(data)
            dispatch(
                {
                    type: ReduxActionTypes.SET_WORKS,
                    payload: response.data
                })
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteWork = (id: string) => {
    return async (dispatch: any) => {
        try {
            const response = await indexAPI.deleteWork(id)
            dispatch(
                {
                    type: ReduxActionTypes.SET_WORKS,
                    payload: response.data
                })
        } catch (e) {
            console.log(e)
        }
    }
}

export const auth = (data: any) => {
    return async (dispatch: any) => {
        indexAPI.auth(data)
            .then(res =>{
            localStorage.setItem('token', res.data)
            dispatch({type: ReduxActionTypes.IS_AUTH})
            dispatch({type: ReduxActionTypes.IS_AUTH_MODAL})

        })
            .catch(e => {
                dispatch({
                    type: ReduxActionTypes.ADD_ERROR,
                    payload: {name: 'auth', value:'Пароль не верен'}
                })
            })

    }
}