import React from 'react'
import classes from './Dashboard.module.css'
import {IInfo} from '../redux/reducers'
type props = {
    info: IInfo
}
const Info = ({info} : props) => {
    return (
        <>
            <img src="https://avatars.githubusercontent.com/u/78543687?s=400&u=78895e08cc6d10f51e57f60053262620138813f0&v=4" className={classes.avatar} alt=""/>
            <div>
                <h3>{info.name}</h3>
                <h5>{info.job}</h5>
            </div>
            <div>
                {info.desc}<br/>
            </div>
            <div>
                {info.workWidthTittle}<br/>
                {info.workWidth}<br/>
            </div>
            {info.contacts?.map(contact=>(
                <div className={classes.social}>
                    <div>{contact.key}:</div><div>{contact.value}</div>
                </div>
            ))}
        </>
    )
}

export default Info