import * as React from "react";
import { Button, Card, FormControl } from "react-bootstrap";
import classes from "./Dashboard.module.css";

const EditItem = () => {
  return (
    <Card border="danger">
      <Card.Body>
        <Card.Title>
          <FormControl
            placeholder="Название"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </Card.Title>
        <Card.Title style={{ marginBottom: 20 }}>
          <FormControl
            placeholder="Тип"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </Card.Title>
        <FormControl
          placeholder="#Теги"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <hr />

        <Card.Text>
          <div style={{ fontSize: 18 }}>
            <ul>
              <li>
                <FormControl
                  placeholder="Маркер"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <hr />
                <Button style={{ width: "100%" }}>Добавить</Button>
              </li>
            </ul>
          </div>
        </Card.Text>
        <div>
          <hr />
        </div>
        <div className={classes.grid}>
          <FormControl
            placeholder="Ссылка на демо"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <FormControl
            placeholder="Ссылка не GitHub"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </div>
        <hr />
        <Button style={{ width: "100%" }}>Опубликовать</Button>
      </Card.Body>
    </Card>
  );
};

export default EditItem;
