import { createReducer, on } from '@ngrx/store';
import { setInfo, setLocale, setWorks } from './app.actions';
import { GetInfo, GetWork } from '../../generated/graphql';

export interface State {
  info: GetInfo;
  works: GetWork[] | null;
  locale: string;
}
const initialState: State = {
  info: {} as unknown as GetInfo,
  works: [] as GetWork[],
  locale: '',
};
export const appReducer = createReducer(
  initialState,
  on(setInfo, (state, { info }) => ({ ...state, info: info })),
  on(setWorks, (state, { works }) => ({ ...state, works: works })),
  on(setLocale, (state, { locale }) => ({ ...state, locale: locale }))
);
