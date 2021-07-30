export enum ReduxActionTypes{
    SET_INFO='SET_INFO',
    SET_WORKS='SET_WORKS',
}
interface SetInfo{
    type: ReduxActionTypes.SET_INFO
    payload: any
}
interface SetWorks{
    type: ReduxActionTypes.SET_WORKS
    payload: any
}
export type ReduxActions =
      SetInfo
    | SetWorks
