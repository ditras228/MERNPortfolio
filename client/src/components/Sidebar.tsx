import React from "react";
import {Badge, Nav} from 'react-bootstrap'
import classes from './Dashboard.module.css'
import {useSelector} from 'react-redux'
import {useTypedSelector} from '../hooks/useTypedSelector'
import EditInfo from './EditInfo'
import Info from './Info'

const Sidebar: React.FC<any> = ({isAuth}) => {
    const info = useTypedSelector(state => state.index.info)
    return (
        <>

            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                 activeKey="/home"
                 onSelect={selectedKey => alert(`selected ${selectedKey}`)}

            >
                <div className={classes.main}>
                    {
                        isAuth
                            ?<EditInfo info={info}/>
                            :<Info info={info}/>

                    }
                </div>

            </Nav>

        </>
    );
};
//const Sidebar = withRouter(Side);
export default Sidebar