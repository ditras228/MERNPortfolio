import { State } from './modal.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureName = 'modal';

const modalState = createFeatureSelector<State>(featureName);

export const selectIsLoginVisible = createSelector(
  modalState,
  state => state.isLoginVisible
);
export const selectEditInfoVisible = createSelector(
  modalState,
  state => state.isInfoVisible
);
export const selectEditWorkVisible = createSelector(
  modalState,
  state => state.isWorkVisible
);
export const selectEditDescVisible = createSelector(
  modalState,
  state => state.isDescVisible
);
export const selectCreateWorkVisible = createSelector(
  modalState,
  state => state.isCreateWorkVisible
);
export const selectCreateDescVisible = createSelector(
  modalState,
  state => state.isCreateDescVisible
);

export const selectLock = createSelector(modalState, state => state.isLock);

export const selectCurrentWorkID = createSelector(
  modalState,
  state => state.currentEditWork
);
export const selectCurrentDesc = createSelector(
  modalState,
  state => state.currentEditDesc
);
