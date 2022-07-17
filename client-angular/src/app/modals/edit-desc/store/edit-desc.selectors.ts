import {State} from "./edit-desc.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const featureName = 'editDesc';

const editDescState = createFeatureSelector<State>(featureName);

export const selectEditInfoFormInput = createSelector(editDescState, state => state.input);
