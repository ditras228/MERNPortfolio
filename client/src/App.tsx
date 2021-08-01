import * as React from 'react'
import NavBar from './components/NavBar'
import ItemList from './components/ItemList'
import Sidebar from './components/Sidebar'
import {Col, Container, Row} from 'react-bootstrap'
import './components/Dashboard.module.css'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {get} from './redux/thunk'
import ModalItem from './components/ModalItem'
import {useTypedSelector} from './hooks/useTypedSelector'
import ModalAuth from './components/ModalAuth'

function App() {
    const isAuth = useTypedSelector(state => state.index.isAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get())
    }, [])
    return (
        <>
            <NavBar/>
            <Container>
                <Row style={{width: '100%'}}>
                    <Col xs={3} id="sidebar-wrapper">
                        <Sidebar isAuth={isAuth}/>
                    </Col>
                    <Col xs={9} id="page-content-wrapper">
                        <ItemList isAuth={isAuth}/>
                    </Col>
                </Row>

            </Container>
            <ModalItem/>
            <ModalAuth/>
        </>
    )
}

export default App
