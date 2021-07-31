export enum ReduxActionTypes{
    SET_INFO='SET_INFO',
    SET_WORKS='SET_WORKS',
    ADD_CONTACT='ADD_CONTACT',
    REMOVE_CONTACT='REMOVE_CONTACT',
    IS_MODAL_WORKS='IS_MODAL_WORKS',
    ADD_MARK='ADD_MARK',
    REMOVE_MARK='REMOVE_MARK',
}
interface AddMark{
    type: ReduxActionTypes.ADD_MARK,
    payload: any
}
interface RemoveMark{
    type: ReduxActionTypes.REMOVE_MARK,
    payload: any
}
interface ModalWorks{
    type: ReduxActionTypes.IS_MODAL_WORKS
}
interface SetInfo{
    type: ReduxActionTypes.SET_INFO
    payload: any
}
interface SetWorks{
    type: ReduxActionTypes.SET_WORKS
    payload: any
}
interface AddContact{
    type: ReduxActionTypes.ADD_CONTACT
    payload: any
}
interface RemoveContact{
    type: ReduxActionTypes.REMOVE_CONTACT
    payload: any
}
export type ReduxActions =
      SetInfo
    | SetWorks
    | AddContact
    | RemoveContact
    | ModalWorks
    | AddMark
    | RemoveMark