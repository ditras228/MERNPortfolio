import { createReducer, on } from '@ngrx/store';
import { setLanguageVisible } from './navbar.actions';

export interface State {
  isVisible: boolean;
}

const initialState: State = {
  isVisible: false,
};

export const navbarReducer = createReducer(
  initialState,
  on(setLanguageVisible, state => ({
    ...state,
    isVisible: !state.isVisible,
  }))
);
