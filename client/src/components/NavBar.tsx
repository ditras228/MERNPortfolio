import * as React from 'react'
import {Button, Container, Navbar} from 'react-bootstrap'
import {Layers} from 'react-bootstrap-icons'
import {useDispatch} from 'react-redux'
import {ReduxActionTypes} from '../types/redux'

const NavBar = () => {
    const dispatch=useDispatch()
    const authHandler=()=>{
        dispatch({type: ReduxActionTypes.IS_AUTH_MODAL})
    }
    return (
        <>
            <Navbar bg="dark" variant="dark" sticky={'top'}>
                <Container>
                    <Navbar.Brand href="#home">
                        <Layers
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                            MERNPortfolio
                    </Navbar.Brand>
                    <Button onClick={authHandler}>Админ</Button>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar