import {State} from "./app.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const featureName = 'info';

const infoState = createFeatureSelector<State>(featureName);

export const selectInfo = createSelector(infoState, state => state.info);
export const selectWorks = createSelector(infoState, state => state.works);


