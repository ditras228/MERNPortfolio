import React from "react";
import { Nav } from "react-bootstrap";
import classes from "./Dashboard.module.css";
import { useTypedSelector } from "../hooks/useTypedSelector";
import EditInfo from "./EditInfo";
import Info from "./Info";

const Sidebar: React.FC<any> = ({ isAuth }) => {
  const info = useTypedSelector((state) => state.index.info);
  return (
    <>
      <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className={classes.main}>
          {isAuth ? <EditInfo info={info} /> : <Info info={info} />}
        </div>
      </Nav>
    </>
  );
};
//const Sidebar = withRouter(Side);
export default Sidebar;
