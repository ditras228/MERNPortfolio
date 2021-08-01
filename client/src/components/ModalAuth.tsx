import React from 'react'
import {Alert, Button, FormControl, Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import classes from './Dashboard.module.css'
import * as  yup from 'yup'
import {isEmpty} from '../vendor'
import {useDispatch} from 'react-redux'
import {auth} from '../redux/thunk'
import {useTypedSelector} from '../hooks/useTypedSelector'
import {ReduxActionTypes} from '../types/redux'
const validationSchema = yup.object({
    login: yup.string().required(),
    password: yup.string().required(),
})

const ModalAuth = () => {
    const active = useTypedSelector(state=>state.index.isAuthModal)
    const error = useTypedSelector(state=>state.index.errors).filter((error:any)=>error.name!=='auth')[0]
    const dispatch=useDispatch()
    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        onSubmit: values => {
            dispatch(auth(values))
        },
        validationSchema: validationSchema
    })
    const closeHandler=()=>{
        dispatch({type: ReduxActionTypes.IS_AUTH_MODAL})
    }
    return (
        <Modal show={active} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Вход</Modal.Title>
            </Modal.Header>
            <Modal.Body className={classes.editGrid}>
                <FormControl
                    placeholder="Логин"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    name={'login'}
                    value={formik.values.login}
                    onChange={formik.handleChange}
                />
                <FormControl
                    placeholder="Пороль"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    name={'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type={'password'}
                />
                {!isEmpty(formik.errors) && <Alert variant={'danger'}>Не все поля заполнены</Alert>}
                {!isEmpty(error) && <Alert variant={'danger'}>{error.value}</Alert>}
                <Button style={{width: '100%'}} onClick={()=>   formik.handleSubmit()}>Войти</Button>
            </Modal.Body>
        </Modal>
    )
}

export default ModalAuth