import * as React from 'react'
import NavBar from './components/NavBar'
import ItemList from './components/ItemList'
import Sidebar from './components/Sidebar'
import {Col, Container, Row} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {get} from './redux/thunk'
import ModalItem from './components/ModalItem'
import {useTypedSelector} from './hooks/useTypedSelector'
import ModalAuth from './components/ModalAuth'
import classes from './components/Dashboard.module.css'

function App() {
    const isAuth = useTypedSelector(state => state.index.isAuth)
    const name = useTypedSelector(state => state.index.info.name)
    const dispatch = useDispatch()
    useEffect(() => {
        document.title=name || 'Загрузка...'
        dispatch(get())
    }, [name])
    return (
        <>
            <NavBar/>
            <Container>
                <div className={classes.row}>
                        <Sidebar isAuth={isAuth}/>
                        <ItemList isAuth={isAuth}/>
                </div>
            </Container>
            <ModalItem/>
            <ModalAuth/>
        </>
    )
}

export default App
