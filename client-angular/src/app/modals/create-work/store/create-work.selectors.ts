import { State } from './create-work.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureName = 'createWork';

const editWorkState = createFeatureSelector<State>(featureName);

export const selectCreateFormInput = createSelector(
  editWorkState,
  state => state.input
);
