import React from "react";
import { Button, Container } from "react-bootstrap";
import Item from "./Item";
import { ReduxActionTypes } from "../types/redux";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IWork } from "../redux/reducers";

const ItemList = ({ isAuth }: any) => {
  const dispatch = useDispatch();
  const openHandler = () => {
    dispatch({
      type: ReduxActionTypes.IS_MODAL_WORKS,
    });
  };
  const works = useTypedSelector((state) => state.index.works);
  return (
    <Container style={{ paddingTop: 30 }}>
      {isAuth && (
        <Button
          onClick={openHandler}
          style={{ width: "100%", marginBottom: "20px" }}
        >
          Добавить
        </Button>
      )}
      {works.map((work: IWork) => (
        <Item isAuth={isAuth} key={work._id} work={work} />
      ))}
    </Container>
  );
};

export default ItemList;
