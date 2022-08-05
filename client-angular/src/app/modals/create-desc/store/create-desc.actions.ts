import { createAction } from '@ngrx/store';
import { UpdateTranslationInput } from '../../../../generated/graphql';

export type CreateDescInputs = {
  text: UpdateTranslationInput;
  img: string;
};

export const setCreateDescForm = createAction(
  '[App] SetCreateDescForm',
  (input: CreateDescInputs) => ({ input })
);
export const submitCreateDescForm = createAction('[App] SubmitCreateDescForm');
