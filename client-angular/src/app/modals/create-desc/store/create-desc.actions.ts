import {createAction} from "@ngrx/store";

export type CreateDescInputs= {
  text: string,
  imgUrl: string
}

export const setCreateDescForm = createAction(
  "[App] SetCreateDescForm",
  (input: CreateDescInputs) => ({ input })
);
export const submitCreateDescForm = createAction(
  "[App] SubmitCreateDescForm"
);
