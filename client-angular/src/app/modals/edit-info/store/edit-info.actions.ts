import { createAction } from '@ngrx/store';
import { UpdateTranslationInput } from '../../../../generated/graphql';

export type EditInfoInputs = {
  experience: UpdateTranslationInput;
  githubTitle: string;
  githubLink: string;
  job: string;
  name: UpdateTranslationInput;
  img: string;
  telegramTitle: string;
  telegramLink: string;
};

export const setEditInfoForm = createAction(
  '[App] SetEditInfoForm',
  (input: EditInfoInputs) => ({ input })
);
export const submitEditInfoForm = createAction('[App] SubmitEditInfoForm');
export const deleteWork = createAction('[App] DeleteWork');
