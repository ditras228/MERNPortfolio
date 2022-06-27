import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ReduxActionTypes } from "../../../types/redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useFormik } from "formik";
import { addWork } from "../../../redux/thunk";

const yup = require("yup");

const validationSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
  tags: yup.string().required(),
  github: yup.string().required(),
  demo: yup.string().required(),
});

const ModalAuthItem = () => {
  const dispatch = useDispatch();
  const marks = useTypedSelector((state) => state.index.editWork.mark);
  const isActive = useTypedSelector((state) => state.index.isWorksModal);

  const closeHandler = () => {
    dispatch({
      type: ReduxActionTypes.IS_MODAL_WORKS,
    });
  };

  const addMarkHandler = () => {
    dispatch({
      type: ReduxActionTypes.ADD_MARK,
      payload: formik.values.mark,
    });
  };

  const removeMarkHandler = (mark: any) => {
    dispatch({
      type: ReduxActionTypes.REMOVE_MARK,
      payload: mark,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      tags: "",
      mark: "",
      github: "",
      demo: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        addWork({
          ...values,
          mark: marks,
          links: { github: formik.values.github, demo: formik.values.demo },
          tags: formik.values.tags.split(" ").filter((value) => value !== ""),
        })
      );
    },
  });

  useEffect(() => {
    console.log(marks);
  }, [marks]);

  return (
    <div></div>
    // <Modal show={isActive} onHide={closeHandler}>
    //   <Modal.Header>
    //     <Modal.Title>Создать работу</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <Card border="danger">
    //       <Card.Body>
    //         <Card.Title>
    //           <FormControl
    //             placeholder="Название"
    //             aria-label="Recipient's username"
    //             aria-describedby="basic-addon2"
    //             name={"name"}
    //             value={formik.values.name}
    //             onChange={formik.handleChange}
    //           />
    //         </Card.Title>
    //         <Card.Title style={{ marginBottom: 20 }}>
    //           <FormControl
    //             placeholder="Тип"
    //             aria-label="Recipient's username"
    //             aria-describedby="basic-addon2"
    //             name={"desc"}
    //             value={formik.values.desc}
    //             onChange={formik.handleChange}
    //           />
    //         </Card.Title>
    //         <FormControl
    //           placeholder="#Теги"
    //           aria-label="Recipient's username"
    //           aria-describedby="basic-addon2"
    //           name={"tags"}
    //           value={formik.values.tags}
    //           onChange={formik.handleChange}
    //         />
    //         <hr />
    //         {marks &&
    //           marks.map((mark) => (
    //             <div className={classes.li}>
    //               <li>{mark}</li>
    //               <Button
    //                 onClick={() => removeMarkHandler(mark)}
    //                 className={classes.closeButton}
    //               >
    //                 X
    //               </Button>
    //             </div>
    //           ))}
    //         <Card.Text>
    //           <div style={{ fontSize: 18 }}>
    //             <FormControl
    //               placeholder="Маркер"
    //               aria-label="Recipient's username"
    //               aria-describedby="basic-addon2"
    //               name={"mark"}
    //               value={formik.values.mark}
    //               onChange={formik.handleChange}
    //             />
    //             <Button
    //               onClick={addMarkHandler}
    //               style={{ width: "100%", marginTop: 10 }}
    //             >
    //               Добавить
    //             </Button>
    //           </div>
    //         </Card.Text>
    //         <div>
    //           <hr />
    //         </div>
    //         <div className={classes.grid}>
    //           <FormControl
    //             placeholder="Ссылка на демо"
    //             aria-label="Recipient's username"
    //             aria-describedby="basic-addon2"
    //             name={"demo"}
    //             value={formik.values.demo}
    //             onChange={formik.handleChange}
    //           />
    //           <FormControl
    //             placeholder="Ссылка не GitHub"
    //             aria-label="Recipient's username"
    //             aria-describedby="basic-addon2"
    //             name={"github"}
    //             value={formik.values.github}
    //             onChange={formik.handleChange}
    //           />
    //         </div>
    //         {!isEmpty(formik.errors) ? (
    //           <Alert variant={"danger"} style={{ marginTop: 10 }}>
    //             Не все поля заполнены
    //           </Alert>
    //         ) : (
    //           <></>
    //         )}
    //         <hr />
    //         <Button
    //           style={{ width: "100%" }}
    //           onClick={() => formik.handleSubmit()}
    //         >
    //           Опубликовать
    //         </Button>
    //       </Card.Body>
    //     </Card>
    //   </Modal.Body>
    // </Modal>
  );
};

export default ModalAuthItem;
