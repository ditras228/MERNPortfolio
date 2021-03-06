import { State } from './login-modal.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureName = 'login';

const loginState = createFeatureSelector<State>(featureName);

export const selectIsLoginVisible = createSelector(
  loginState,
  state => state.isLoginVisible
);
export const selectEditInfoVisible = createSelector(
  loginState,
  state => state.isInfoVisible
);
export const selectEditWorkVisible = createSelector(
  loginState,
  state => state.isWorkVisible
);
export const selectEditDescVisible = createSelector(
  loginState,
  state => state.isDescVisible
);
export const selectCreateWorkVisible = createSelector(
  loginState,
  state => state.isCreateWorkVisible
);
export const selectCreateDescVisible = createSelector(
  loginState,
  state => state.isCreateDescVisible
);
export const selectLoginInput = createSelector(
  loginState,
  state => state.input
);
export const selectLoginError = createSelector(
  loginState,
  state => state.error
);
export const selectLock = createSelector(loginState, state => state.isLock);

export const selectCurrentWorkID = createSelector(
  loginState,
  state => state.currentEditWork
);
export const selectCurrentDesc = createSelector(
  loginState,
  state => state.currentEditDesc
);

export const selectIsAuth = createSelector(loginState, state => state.isAuth);
