import React from "react";
import WorkItem from "./components/work-item/work-item";
import { ReduxActionTypes } from "../../types/redux";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IWork } from "../../redux/reducers";
import "./work-list.scss";

const WorkList = ({ isAuth }: any) => {
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
        <WorkItem isAuth={isAuth} key={work._id} work={work} />
      ))}
    </div>
  );
};

export default WorkList;
