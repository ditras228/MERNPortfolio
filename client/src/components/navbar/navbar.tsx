import * as React from "react";
import { useDispatch } from "react-redux";
import { ReduxActionTypes } from "../../types/redux";
import "./navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const authHandler = () => {
    dispatch({ type: ReduxActionTypes.IS_AUTH_MODAL });
  };

  return (
    <div className={"navbar"}>
      MERNPortfolio
      <button onClick={authHandler}>Админ</button>
    </div>
  );
};

export default Navbar;
