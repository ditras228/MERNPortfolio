import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { indexAPI } from "../../API";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { ReduxActionTypes } from "../../types/redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IInfo } from "../../redux/reducers";
import { isEmpty } from "../../vendor";

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
  const dispatch = useDispatch();
  const [contactName, setContactName] = useState("");
  const [contactValue, setContactValue] = useState("");

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

  const addContactHandler = (): void => {
    dispatch({
      type: ReduxActionTypes.ADD_CONTACT,
      payload: { key: contactName, value: contactValue },
    });
  };

  const deleteContactHandler = (contact: any): void => {
    dispatch({
      type: ReduxActionTypes.REMOVE_CONTACT,
      payload: contact,
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => formik.handleSubmit()} style={{ width: "100%" }}>
          Сохранить
        </button>
        <input
          placeholder="Изображение"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"image"}
          value={formik.values.image}
          onChange={formik.handleChange}
        />
        <input
          placeholder="Имя"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"name"}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <input
          placeholder="Профессия"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"job"}
          value={formik.values.job}
          onChange={formik.handleChange}
        />
        <input
          placeholder="Обо мне"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"desc"}
          value={formik.values.desc}
          onChange={formik.handleChange}
        />
        <input
          placeholder="Опыт работы"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"workWidthTittle"}
          value={formik.values.workWidthTittle}
          onChange={formik.handleChange}
        />
        <input
          placeholder="Библиотеки"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name={"workWidth"}
          value={formik.values.workWidth}
          onChange={formik.handleChange}
        />
      </div>

      {!isEmpty(formik.errors) ? <div>Не все поля заполнены</div> : <></>}
      <div>
        <hr />
        {contacts.contacts &&
          contacts.contacts.map((contact: any) => {
            return (
              <div key={contact.key}>
                <div>
                  <div>
                    <div>{contact.key}</div>
                  </div>
                  <div>{contact.value}</div>
                </div>

                <button onClick={() => deleteContactHandler(contact)}>X</button>
              </div>
            );
          })}
        <div>
          <input
            placeholder="Тип контакта"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            name={"contactsName"}
            value={contactName}
            onChange={(e: any) => setContactName(e.currentTarget.value)}
          />
          <input
            placeholder="Значение"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            name={"contactValue"}
            value={contactValue}
            onChange={(e: any) => setContactValue(e.currentTarget.value)}
          />
        </div>

        <button
          onClick={() => addContactHandler()}
          style={{ width: "100%", marginTop: 5 }}
        >
          Добавить новый
        </button>
      </div>
    </div>
  );
};

export default EditInfo;
