import { createReducer, on } from '@ngrx/store';
import {
  setCreateDescVisible,
  setCreateWorkVisible,
  setEditDescVisible,
  setEditInfoVisible,
  setEditWorkVisible,
  setLock,
  setLoginVisible,
} from './modal.actions';
import { GetDesc, GetWork } from '../../../../generated/graphql';

export interface State {
  isLock: boolean;
  isLoginVisible: boolean;
  isWorkVisible: boolean;
  isCreateDescVisible: boolean;
  isCreateWorkVisible: boolean;
  isInfoVisible: boolean;
  isDescVisible: boolean;
  currentEditWork: GetWork | undefined;
  currentEditDesc: GetDesc | undefined;
}

const initialState: State = {
  isWorkVisible: false,
  isCreateDescVisible: false,
  isCreateWorkVisible: false,
  isInfoVisible: false,
  isDescVisible: false,
  isLock: false,
  isLoginVisible: false,
  currentEditWork: undefined,
  currentEditDesc: undefined,
};

export const modalReducer = createReducer(
  initialState,
  on(setLoginVisible, state => ({
    ...state,
    isLoginVisible: !state.isLoginVisible,
    isLock: !state.isLock,
  })),
  on(setEditInfoVisible, state => ({
    ...state,
    isInfoVisible: !state.isInfoVisible,
    isLock: !state.isLock,
  })),
  on(setEditWorkVisible, (state, { work }) => ({
    ...state,
    isWorkVisible: !state.isWorkVisible,
    currentEditWork: work,
    isLock: !state.isLock,
  })),
  on(setCreateWorkVisible, state => ({
    ...state,
    isCreateWorkVisible: !state.isCreateWorkVisible,
    isLock: !state.isLock,
  })),
  on(setEditDescVisible, (state, { desc }) => ({
    ...state,
    isDescVisible: !state.isDescVisible,
    currentEditDesc: desc,
    isLock: !state.isLock,
  })),
  on(setLock, state => ({ ...state, isLock: !state.isLock })),
  on(setCreateDescVisible, state => ({
    ...state,
    isCreateDescVisible: !state.isCreateDescVisible,
    isLock: !state.isLock,
  }))
);
