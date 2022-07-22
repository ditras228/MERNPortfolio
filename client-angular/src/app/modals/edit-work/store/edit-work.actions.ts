import {createAction} from "@ngrx/store";
import {GetTag} from "../../../../generated/graphql";

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

export const addTag = createAction(
  "[App] AddTag",
  (input: GetTag)=>({input})
);

export const removeTag = createAction(
  "[App] RemoveTag",
  (input: GetTag)=>({input})
);

export const getTags = createAction(
  "[App] GetTags"
);

export const setTags = createAction(
  "[App] SetTags",
  (tags: GetTag[]| any )=>({tags})
);

export const setEditWorkTags = createAction(
  "[App] SetEditWorkTags",
  (tags: GetTag[]| any )=>({tags})
);

export const setFilterTags = createAction(
  "[App] SetFilterTags"
);
