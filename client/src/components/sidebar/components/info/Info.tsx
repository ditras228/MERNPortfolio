import React from "react";
import "./Info.scss";
import { IInfo } from "../../../../redux/reducers";
import DevTools from "../dev-tools/dev-tools";
import Skills from "../skills/skills";
import Contacts from "../contacts/contacts";

type props = {
  info: IInfo;
};

const Info = ({ info }: props) => {
  return (
    <div className="info">
      <div className="info__who">{info.name}</div>
      <div className="info__job">{info.job}</div>
      <DevTools></DevTools>
      <div className="info__desc">{info.desc}</div>
      <Skills></Skills>
      <Contacts></Contacts>
      {/*{info.contacts?.map((contact) => (*/}
      {/*  <div className={"info__social"}>*/}
      {/*    <div>{contact.key}:</div>*/}
      {/*    <div>{contact.value}</div>*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  );
};

export default Info;
