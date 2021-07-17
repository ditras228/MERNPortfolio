import * as React from 'react'
import {Button, Card} from 'react-bootstrap'

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
                <Card.Title>MERNDISK</Card.Title>
                <Card.Title>Облачное хранилище</Card.Title>
                <Card.Text>
                    Загрузка/скачивание/поиск файлов, либо папок, система Drag&drop, <br/>
                    рекурсивная загрузка папок на сервер, выгрузка с помощью ZIP архива
                </Card.Text>
                <div>Стек:
                    {
                        tags.map(item=>(
                            <div>{item}</div>
                        ))
                    }
                </div>
                <Button variant="primary">Демо</Button>
                <Button variant="primary">Github</Button>
            </Card.Body>
        </Card>
    )
}

export default Item