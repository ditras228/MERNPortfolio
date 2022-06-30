import * as React from "react";
import { IWork } from "../../../../redux/reducers";
import { useDispatch } from "react-redux";
import { deleteWork } from "../../../../redux/thunk";
import "./work-item.scss";

type props = {
  work: IWork;
  isAuth: boolean;
};

const WorkItem = ({ work, isAuth }: props) => {
  const dispatch = useDispatch();
  const isOurLink = work.links.demo === "/";

  const redirectHandler = (key: string) => {
    let redirectTo = "";
    key === "github"
      ? (redirectTo = work.links.github)
      : (redirectTo = work.links.demo);
    window.location.href = redirectTo;
  };

  const deleteHandler = () => {
    dispatch(deleteWork(work._id));
  };

  return (
    <div className="work">
      <div className="work__title">Облачное хранилище</div>
      <div className="work__tags">
        <div className="work__tags__item">MongoDB</div>
        <div className="work__tags__item">ExpressJS</div>
        <div className="work__tags__item">ReactJS</div>
        <div className="work__tags__item">NodeJS</div>
      </div>
      <div className="work__functional-list">
        <div className="work__functional-list__item">
          Загрузка, поиск, скачивание файлов, либо папок
        </div>
        <div className="work__functional-list__item">Система drag & drop</div>
        <div className="work__functional-list__item">
          Рекурсивная загрузка папок на сервер
        </div>
        <div className="work__functional-list__item">Система авторизации</div>
        <div className="work__functional-list__item">
          Рассылка писем на Email
        </div>
      </div>
      <div className="work__buttons">
        <div className="work__buttons__group">
          <button className="work__buttons__group__item">GitHub</button>
          <button className="work__buttons__group__item">Figma</button>
        </div>
        <button className="work__buttons__item-fill">Демо</button>
      </div>
    </div>
  );
};

export default WorkItem;
