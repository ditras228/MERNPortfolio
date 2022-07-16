import {State} from "./edit-info.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const featureName = 'editInfo';

const editWorkState = createFeatureSelector<State>(featureName);

export const selectEditInfoFormInput = createSelector(editWorkState, state => state.input);
