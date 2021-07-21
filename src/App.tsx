import * as React from 'react'
import NavBar from './components/NavBar'
import ItemList from './components/ItemList'
import Sidebar from './components/Sidebar'
import {Col, Container, Row} from 'react-bootstrap'
import './components/Dashboard.module.css'
function App() {
  return (
      <>
          <NavBar/>
          <Container >
              <Row style={{width:'100%'}}>
                  <Col xs={3} id="sidebar-wrapper">
                      <Sidebar />
                  </Col>
                  <Col  xs={9} id="page-content-wrapper">
                      <ItemList/>
                  </Col>
              </Row>

          </Container>

      </>
  );
}

export default App;
