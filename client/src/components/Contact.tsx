import React from "react";
import { FormControl } from "react-bootstrap";

const Contact = ({ name, value, formik }: any) => {
  return (
    <div>
      <FormControl
        placeholder="Тип контакта"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        value={name}
        onChange={formik.handleChange}
      />
      <FormControl
        placeholder="Значение"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        value={`${value}`}
        onChange={formik.handleChange}
      />
    </div>
  );
};

export default Contact;
