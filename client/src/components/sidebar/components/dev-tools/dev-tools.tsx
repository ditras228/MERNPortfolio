import React from "react";
import angularIcon from "../../../../svg/tools/angular-icon.svg";
import grapqlIcon from "../../../../svg/tools/grapql-icon.svg";
import golangIcon from "../../../../svg/tools/golang-icon.svg";
import "./dev-tools.scss";

const DevTools = () => {
  return (
    <div className="dev-tools">
      <img className="dev-tools__item" src={angularIcon} alt="" />
      <img className="dev-tools__item" src={grapqlIcon} alt="" />
      <img className="dev-tools__item" src={golangIcon} alt="" />
    </div>
  );
};

export default DevTools;
