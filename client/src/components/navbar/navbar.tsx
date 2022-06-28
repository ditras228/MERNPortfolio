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
    <div className="navbar">
      <div className="navbar__container">
        MERNPortfolio
        <button className="navbar__container__admin-btn" onClick={authHandler}>
          Админка
        </button>
      </div>
    </div>
  );
};

export default Navbar;
