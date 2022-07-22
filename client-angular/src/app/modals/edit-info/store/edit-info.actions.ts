import { createAction } from '@ngrx/store';

export type EditInfoInputs = {
  experience: string;
  githubTitle: string;
  githubLink: string;
  job: string;
  name: string;
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
