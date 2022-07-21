import {createAction} from "@ngrx/store";

export type EditDescInputs= {
  id: number,
  text: string,
  imgUrl: string
}

export const setEditDescForm = createAction(
  "[App] SetEditDescForm",
  (input: EditDescInputs) => ({ input })
);
export const submitEditDescForm = createAction(
  "[App] SubmitEditDescForm"
);
