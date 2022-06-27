import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import EditInfo from "../edit-info/edit-info";
import Info from "./components/info/Info";
import "./sidebar.scss";
const Sidebar: React.FC<any> = ({ isAuth }) => {
  const info = useTypedSelector((state) => state.index.info);

  return (
    <div
      className="sidebar"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <div>{isAuth ? <EditInfo info={info} /> : <Info info={info} />}</div>
    </div>
  );
};

export default Sidebar;
