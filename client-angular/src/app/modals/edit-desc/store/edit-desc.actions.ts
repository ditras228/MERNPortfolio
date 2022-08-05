import { createAction } from '@ngrx/store';
import { UpdateTranslationInput } from '../../../../generated/graphql';

export type EditDescInputs = {
  id: number;
  text: UpdateTranslationInput;
  img: string;
};

export const setEditDescForm = createAction(
  '[App] SetEditDescForm',
  (input: EditDescInputs) => ({ input })
);

export const submitEditDescForm = createAction('[App] SubmitEditDescForm');

export const setDeleteDesc = createAction(
  '[App] SetDeleteDesc',
  (id: number) => ({ id })
);

export const submitDeleteDesc = createAction('[App] SubmitDeleteDesc');
