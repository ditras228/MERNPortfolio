import {createAction} from "@ngrx/store";

export type EditWorkInputs= {
  id: number | undefined,
  demo: string,
  description: string
  figma: string
  github: string
  name: string
  tags: Array<number>
}

export const setEditWorkForm = createAction(
  "[App] SetEditWorkForm",
  (input: EditWorkInputs) => ({ input })
);
export const submitEditWorkForm = createAction(
  "[App] SubmitEditWorkForm"
);
