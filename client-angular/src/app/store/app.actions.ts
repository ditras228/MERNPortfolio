import { createAction } from '@ngrx/store';
import { GetInfo, GetWork } from '../../generated/graphql';

// Info
export const getInfo = createAction('[App] getInfo');
export const setInfo = createAction('[App] SetInfo', (info: GetInfo) => ({
  info,
}));

// Works
export const getWorks = createAction('[App] getWorks');
export const setWorks = createAction(
  '[App] SetWorks',
  (works: GetWork[] | any) => ({ works })
);

export const setLocale = createAction('[App] SetLocale', (locale: string) => ({
  locale,
}));

export const okay = createAction('[App] Okay');
