import React from "react";
import Item from "../item/item";
import { ReduxActionTypes } from "../../types/redux";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IWork } from "../../redux/reducers";
import "./item-list.scss";

const ItemList = ({ isAuth }: any) => {
  const dispatch = useDispatch();
  const works = useTypedSelector((state) => state.index.works);

  const openHandler = () => {
    dispatch({
      type: ReduxActionTypes.IS_MODAL_WORKS,
    });
  };

  return (
    <div className="item-list">
      {isAuth && (
        <button
          onClick={openHandler}
          style={{ width: "100%", marginBottom: "20px" }}
        >
          Добавить
        </button>
      )}
      {works.map((work: IWork) => (
        <Item isAuth={isAuth} key={work._id} work={work} />
      ))}
    </div>
  );
};

export default ItemList;
