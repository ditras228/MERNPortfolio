import React, { useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import { Alert, Button, FormControl } from "react-bootstrap";
import { useFormik } from "formik";
import { indexAPI } from "../API";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { ReduxActionTypes } from "../types/redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IInfo } from "../redux/reducers";
import { isEmpty } from "../vendor";

type props = {
  info: IInfo;
};
const validationSchema = Yup.object({
  name: Yup.string().required("Обязательно"),
  job: Yup.string().required("Обязательно"),
  desc: Yup.string().required("Обязательно"),
  workWidthTittle: Yup.string().required("Обязательно"),
  workWidth: Yup.string().required("Обязательно"),
});
const EditInfo = ({ info }: props) => {
  const contacts = useTypedSelector((state) => state.index.info);

  const formik = useFormik({
    initialValues: {
      image: info.image,
      name: info.name,
      job: info.job,
      desc: info.desc,
      workWidthTittle: info.workWidthTittle,
      workWidth: info.workWidth,
      contacts: info.contacts,
    },
    onSubmit: async (values) => {
      await indexAPI.updateInfo({ ...values, contacts: contacts.contacts });
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);
  const dispatch = useDispatch();
  const [contactName, setContactName] = useState("");
  const [contactValue, setContactValue] = useState("");
  const addContactHandler = () => {
    dispatch({
      type: ReduxActionTypes.ADD_CONTACT,
      payload: { key: contactName, value: contactValue },
    });
  };
  const deleteContactHandler = (contact: any) => {
    dispatch({
      type: ReduxActionTypes.REMOVE_CONTACT,
      payload: contact,
    });
  };
  return (
    <div>
      <div className={classes.editGrid}>
        <Button onClick={() => formik.handleSubmit()} style={{ width: "100%" }}>
          Сохранить
        </Button>
        <FormControl
          placeholder="Изображение"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"image"}
          value={formik.values.image}
          onChange={formik.handleChange}
        />
        <FormControl
          placeholder="Имя"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"name"}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <FormControl
          placeholder="Профессия"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"job"}
          value={formik.values.job}
          onChange={formik.handleChange}
        />
        <FormControl
          placeholder="Обо мне"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"desc"}
          value={formik.values.desc}
          onChange={formik.handleChange}
        />
        <FormControl
          placeholder="Опыт работы"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"workWidthTittle"}
          value={formik.values.workWidthTittle}
          onChange={formik.handleChange}
        />
        <FormControl
          placeholder="Библиотеки"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"workWidth"}
          value={formik.values.workWidth}
          onChange={formik.handleChange}
        />
      </div>

      {!isEmpty(formik.errors) ? (
        <Alert variant={"danger"}>Не все поля заполнены</Alert>
      ) : (
        <></>
      )}
      <div>
        <hr />
        {contacts.contacts &&
          contacts.contacts.map((contact: any) => {
            return (
              <div key={contact.key} className={classes.editContact}>
                <div>
                  <div className={classes.editContactTittle}>
                    <div className={classes.contactLine}>{contact.key}</div>
                  </div>
                  <div className={classes.contactLine}>{contact.value}</div>
                </div>

                <Button
                  onClick={() => deleteContactHandler(contact)}
                  className={classes.closeButton}
                >
                  X
                </Button>
              </div>
            );
          })}
        <div className={classes.addContact}>
          <FormControl
            placeholder="Тип контакта"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            name={"contactsName"}
            value={contactName}
            onChange={(e: any) => setContactName(e.currentTarget.value)}
          />
          <FormControl
            placeholder="Значение"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            name={"contactValue"}
            value={contactValue}
            onChange={(e: any) => setContactValue(e.currentTarget.value)}
          />
        </div>

        <Button
          onClick={() => addContactHandler()}
          style={{ width: "100%", marginTop: 5 }}
        >
          Добавить новый
        </Button>
      </div>
    </div>
  );
};

export default EditInfo;
