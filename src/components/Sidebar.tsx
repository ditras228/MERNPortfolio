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
                <div className={classes.main}>
                    <img src="https://avatars.githubusercontent.com/u/78543687?s=400&u=78895e08cc6d10f51e57f60053262620138813f0&v=4" className={classes.avatar} alt=""/>
                    <div>
                    <h3>Дмитрий Дружинин</h3>
                    <h5>MERN-dev</h5>
                    </div>
                    <div>
                        Созданием сайтов разной сложности занимаюсь уже на протяжении 2 лет<br/>
                    </div>
                    <div>
                        Работал с множеством библиотек<br/>
                        REACT/NEXT EXPRESS/NEST GRAPHQL <br/>

                    </div>
                    <div className={classes.social}>
                        <div>email:</div><div>dmitrydruzhinin2020@gmail.com</div>
                    </div>
                    <div className={classes.social}>

                    <div>telegram:</div><div>+79118780302 </div>
                    </div>

                    <div className={classes.social}>

                        <div>GitHub</div><div>ditras228</div>
                    </div>

                </div>

            </Nav>

        </>
    );
};
//const Sidebar = withRouter(Side);
export default Sidebar