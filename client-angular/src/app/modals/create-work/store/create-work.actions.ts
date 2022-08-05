import { createAction } from '@ngrx/store';
import { UpdateTranslationInput } from '../../../../generated/graphql';

export type CreateWorkInputs = {
  demo: string;
  description: UpdateTranslationInput;
  figma: string;
  github: string;
  name: UpdateTranslationInput;
  tags: Array<number>;
};

export const setCreateWorkForm = createAction(
  '[App] SetCreateWorkForm',
  (input: CreateWorkInputs) => ({ input })
);

export const submitCreateWorkForm = createAction('[App] SubmitCreateWorkForm');
