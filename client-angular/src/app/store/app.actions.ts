import {createAction} from "@ngrx/store";
import {Info, Work} from "../../generated/graphql";

// Info
export const getInfo = createAction('[App] getInfo')
export const setInfo = createAction(
  "[App] SetInfo",
  (info: Info) => ({ info })
);

// Works
export const getWorks = createAction('[App] getWorks')
export const setWorks = createAction(
  "[App] SetWorks",
  (works: Work[] | any) => ({ works })
);
