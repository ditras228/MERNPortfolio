import {State} from "./edit-work.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const featureName = 'editWork';

const editWorkState = createFeatureSelector<State>(featureName);

export const selectEditFormInput = createSelector(editWorkState, state => state.input);
export const selectEditFormTags = createSelector(editWorkState, state => state.tags);
export const selectFilterTags = createSelector(editWorkState, state => state.filterTags);
