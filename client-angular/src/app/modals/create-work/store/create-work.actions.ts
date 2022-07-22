import { createAction } from '@ngrx/store';

export type CreateWorkInputs = {
  demo: string;
  description: string;
  figma: string;
  github: string;
  name: string;
  tags: Array<number>;
};

export const setCreateWorkForm = createAction(
  '[App] SetCreateWorkForm',
  (input: CreateWorkInputs) => ({ input })
);

export const submitCreateWorkForm = createAction('[App] SubmitCreateWorkForm');
