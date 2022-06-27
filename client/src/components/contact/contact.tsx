import React from "react";

const Contact = ({ name, value, formik }: any) => {
  return (
    <div>
      <input
        placeholder="Тип контакта"
        value={name}
        onChange={formik.handleChange}
      />
      <input
        placeholder="Значение"
        value={`${value}`}
        onChange={formik.handleChange}
      />
    </div>
  );
};

export default Contact;
