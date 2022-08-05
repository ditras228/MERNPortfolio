import { State } from './navbar.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureName = 'language';

const modalState = createFeatureSelector<State>(featureName);

export const selectIsLanguage = createSelector(
  modalState,
  state => state.isVisible
);
