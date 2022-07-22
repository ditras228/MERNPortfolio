import { State } from './create-desc.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureName = 'createDesc';

const editDescState = createFeatureSelector<State>(featureName);

export const selectEditInfoFormInput = createSelector(
  editDescState,
  state => state.input
);
