import React from "react";
import {Badge, Nav} from 'react-bootstrap'
import classes from './Dashboard.module.css'

const Sidebar: React.FC<any> = props => {
    return (
        <>

            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                 activeKey="/home"
                 onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                <div className={classes.main}>
                    <img src="http://placehold.it/100" className={classes.avatar} alt=""/>
                    <h3>Дмитрий Дружинин</h3>
                    <h5>MERN-разработчик</h5>
                    Практик создания Fullstack приложений <br/>
                    Созданием сайтов различной сложности занимаюсь на протяжении двух лет. <br/>

                    <hr/>
                    Работал с множеством библиотек, прим.<br/>

                    REACT/NEXTJS EXPRESS/NESTJS GRAPHQL <br/>
                    <hr/>
                    email: dmitrydruzhinin@gmail.com <br/>
                    telegramm: +79118780302 <br/>

                </div>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>

        </>
    );
};
//const Sidebar = withRouter(Side);
export default Sidebar