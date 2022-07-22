import { createReducer, on } from '@ngrx/store';
import {
  addTag,
  EditWorkInputs,
  removeTag,
  setEditWorkForm,
  setEditWorkTags,
  setFilterTags,
  setTags,
} from './edit-work.actions';
import { GetTag } from '../../../../generated/graphql';

export interface State {
  input: EditWorkInputs;
  tags: GetTag[];
  allTags: GetTag[];
  filterTags: GetTag[];
}

const initialState: State = {
  input: {} as EditWorkInputs,
  tags: [] as GetTag[],
  allTags: [] as GetTag[],
  filterTags: [] as GetTag[],
};
export const editWorkReducer = createReducer(
  initialState,
  on(setEditWorkForm, (state, { input }) => ({ ...state, input: input })),

  on(setFilterTags, state => ({
    ...state,
    filterTags: state.allTags.filter(
      array22 => !state.tags.some(array11 => array11?.id === array22?.id)
    ),
  })),

  on(setTags, (state, { tags }) => ({ ...state, allTags: tags })),

  on(addTag, (state, { input }) => ({
    ...state,
    tags: [...state.tags, input],
    filterTags: state.filterTags.filter(tag => tag.id != input.id),
  })),
  on(setEditWorkTags, (state, { tags }) => ({ ...state, tags: tags })),
  on(removeTag, (state, { input }) => ({
    ...state,
    filterTags: [...state.filterTags, input],
    tags: state.tags.filter(tag => tag.id != input.id),
  }))
);
