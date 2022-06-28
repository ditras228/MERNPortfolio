import * as React from "react";
import Navbar from "./components/navbar/navbar";
import ItemList from "./components/item-list/item-list";
import Sidebar from "./components/sidebar/sidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { get } from "./redux/thunk";
import ModalAuthItem from "./components/modals/modal-auth/modal-auth-item";
import { useTypedSelector } from "./hooks/useTypedSelector";
import ModalAuth from "./components/modals/modal-auth/modal-auth";
import "./App.scss";
function App() {
  const dispatch = useDispatch();
  const isAuth = useTypedSelector((state) => state.index.isAuth);
  const name = useTypedSelector((state) => state.index.info.name);

  useEffect(() => {
    document.title = name || "Загрузка...";
    dispatch(get());
  }, [name]);

  return (
    <div className="app">
      <Navbar />
      <div className="app__container">
        <Sidebar isAuth={isAuth} />
        <ItemList isAuth={isAuth} />
      </div>
      <ModalAuthItem />
      <ModalAuth />
    </div>
  );
}

export default App;
