import * as React from 'react'
import {Container, Navbar} from 'react-bootstrap'
import {Layers} from 'react-bootstrap-icons'

const NavBar = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <Layers
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                            MERNPortfolio
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar