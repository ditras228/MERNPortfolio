import {State} from "./login-modal.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const featureName = 'login';

const loginState = createFeatureSelector<State>(featureName);

export const selectIsLoginVisible = createSelector(loginState, state => state.isLoginVisible);
export const selectIsAuth = createSelector(loginState, state => state.isAuth);
export const selectLoginInput= createSelector(loginState, state => state.input);
export const selectLoginError= createSelector(loginState, state => state.error);
export const selectLock = createSelector(loginState, state => state.isLock);


