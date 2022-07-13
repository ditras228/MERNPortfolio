import {State} from "./login-modal.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const featureName = 'login';

const loginState = createFeatureSelector<State>(featureName);

export const selectIsLoginVisible = createSelector(loginState, state => state.isLoginVisible);
export const selectLoginInput= createSelector(loginState, state => state.input);


