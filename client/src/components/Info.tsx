import React from 'react'
import classes from './Dashboard.module.css'
import {IInfo} from '../redux/reducers'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {useHistory} from 'react-router'
type props = {
    info: IInfo
}
const renderTooltip = (props:any) => (
    <Tooltip id="button-tooltip" {...props}>
        Перейти на GitHub
    </Tooltip>
);
const Info = ({info} : props) => {
    const router= useHistory()
    const getGitHub = info.contacts.map((contact:any)=>contact.type!=='guthub'[0])
    return (
        <>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <img src={info.image} className={classes.avatar} alt=""
                     onClick={
                         ()=>router.push
                         (`https://github.com/ditras228${getGitHub}`)
                     }/>

            </OverlayTrigger>,
            <div className={classes.who}>
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