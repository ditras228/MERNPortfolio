import React, {useEffect} from 'react'
import {Button, Container} from 'react-bootstrap'
import Item from './Item'
import EditItem from './EditItem'
import {ReduxActionTypes} from '../types/redux'
import {useDispatch} from 'react-redux'
import {indexAPI} from '../API'
import {useTypedSelector} from '../hooks/useTypedSelector'
import {IWork} from '../redux/reducers'

const ItemList = () => {
    const dispatch = useDispatch()
    const openHandler=()=>{
        dispatch({
            type: ReduxActionTypes.IS_MODAL_WORKS
        })
    }
    const works=useTypedSelector(state=>state.index.works)
    return (
        <Container style={{paddingTop: 30}}>
            <Button onClick={openHandler} style={{width: '100%', marginBottom: '20px'}}>Добавить</Button>
            {
                works.map((work: IWork)=>(
                    <Item key={work._id} work={work}/>
                ))
            }

        </Container>
    )
}

export default ItemList