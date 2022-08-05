import { createAction } from '@ngrx/store';
import { GetDesc, GetWork } from '../../../../generated/graphql';

// Login
export const setLoginVisible = createAction('[App] SetLoginVisible');

// Info
export const setEditInfoVisible = createAction('[App] SetEditInfoVisible');

// Work
export const setCreateWorkVisible = createAction('[App] SetCreateWorkVisible');
export const setEditWorkVisible = createAction(
  '[App] SetEditWorkVisible',
  (work: GetWork | undefined) => ({ work })
);

// Description
export const setCreateDescVisible = createAction('[App] SetCreateDescVisible');
export const setEditDescVisible = createAction(
  '[App] SetEditDescVisible',
  (desc: GetDesc | undefined) => ({ desc })
);

// Lock
export const setLock = createAction('[App] IsLock');
