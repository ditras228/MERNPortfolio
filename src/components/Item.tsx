import * as React from 'react'
import {Button, Card} from 'react-bootstrap'
import {Dice2, Github} from 'react-bootstrap-icons'
import   classes from './Dashboard.module.css'

const Item = () => {
    const tags=[
        'Mongodb',
        'ExpressJS',
        'ReactJS',
        'NodeJS'
    ]
    return (
        <Card  border="success" >
            <Card.Body>
                <Card.Title><h3>MERNDISK</h3></Card.Title>
                <Card.Title style={{marginBottom: 20}}><h5>Облачное хранилище</h5></Card.Title>
                {
                    tags.map(item=>(
                        <Button disabled={true} style={{marginRight: 10}}>{item}</Button>
                    ))
                }
                <hr/>

                <Card.Text>
                    <div  style={{fontSize:18}}>
                        <ul>
                            <li>
                                Загрузка/скачивание/поиск файлов, либо папок
                            </li>
                            <li>
                                Система Drag&drop,
                            </li>
                            <li>
                                Рекурсивная загрузка папок на сервер, выгрузка с помощью ZIP архива
                            </li>
                        </ul>
                    </div>

                </Card.Text>
                <div>
                             <hr/>

                </div>
                    <div className={classes.grid}>
                        <Button variant="primary" size="lg" className={classes.item}>
                           <Dice2/> Демо
                        </Button>
                        <Button variant="secondary" size="lg" className={classes.item}>
                           <Github/> Github
                        </Button>
                    </div>
            </Card.Body>
        </Card>
    )
}

export default Item