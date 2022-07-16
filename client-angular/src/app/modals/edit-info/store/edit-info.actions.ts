import {createAction} from "@ngrx/store";

export type EditInfoInputs= {
  desc: string
  experience: string
  githubTitle: string
  githubLink: string
  job: string
  name: string
  telegramTitle: string
  telegramLink: string
}

export const setEditInfoForm = createAction(
  "[App] SetEditInfoForm",
  (input: EditInfoInputs) => ({ input })
);
export const submitEditInfoForm = createAction(
  "[App] SubmitEditInfoForm"
);
