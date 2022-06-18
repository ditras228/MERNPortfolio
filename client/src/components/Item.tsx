import * as React from "react";
import { Button, Card } from "react-bootstrap";
import { Dice2, Github } from "react-bootstrap-icons";
import classes from "./Dashboard.module.css";
import { IWork } from "../redux/reducers";
import { useDispatch } from "react-redux";
import { deleteWork } from "../redux/thunk";
type props = {
  work: IWork;
  isAuth: boolean;
};
const Item = ({ work, isAuth }: props) => {
  const dispatch = useDispatch();
  const isOurLink = work.links.demo === "/" ? true : false;

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
    <Card border="success" style={{ marginBottom: 10 }}>
      <Card.Body>
        <Card.Title>
          <div className={classes.cardTittle}>
            <h3>{work.name}</h3>
            {isAuth && (
              <Button
                onClick={deleteHandler}
                className={classes.closeButton}
                disabled={!isAuth}
              >
                X
              </Button>
            )}
          </div>
        </Card.Title>
        <Card.Title style={{ marginBottom: 20 }}>
          <h5>{work.desc}</h5>
        </Card.Title>
        <div className={classes.tags}>
          {work.tags.map((item) => (
            <Button disabled={true} style={{ marginRight: 10 }}>
              {item}
            </Button>
          ))}
        </div>
        <hr />

        <Card.Text>
          <div style={{ fontSize: 18 }}>
            <ul>
              {work.mark.map((mark) => (
                <li>{mark}</li>
              ))}
            </ul>
          </div>
        </Card.Text>
        <div>
          <hr />
        </div>
        <div className={classes.grid}>
          <Button
            disabled={isOurLink}
            onClick={() => redirectHandler("/")}
            variant="primary"
            size="lg"
            className={classes.item}
          >
            <Dice2 /> {!isOurLink ? "Демо" : "Вы находитесь здесь"}
          </Button>
          <Button
            onClick={() => redirectHandler("github")}
            variant="secondary"
            size="lg"
            className={classes.item}
          >
            <Github /> Github
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Item;
