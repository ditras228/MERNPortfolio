require("dotenv").config()
import axios from 'axios'
export const baseURL= process.env["BASE_URL"]
export const instance = axios.create({
    baseURL: baseURL
})
export const indexAPI={
    auth(data: any){
        return instance.post('/auth', data)
    },
    getInfo(){
        return instance.get('/')
    },
    getWorks(){
        return instance.get('/works')
    },
    updateInfo(data: any){
        return instance.post('/info', data, {headers: {Authorization: localStorage.getItem('token')}})
    },
    addWork(data: any){
        return instance.post('/works', data, {headers: {Authorization: localStorage.getItem('token')}})
    },
    deleteWork(id: string){
        return instance.delete(`/works?id=${id}`, {headers: {Authorization: localStorage.getItem('token')}})
    }
}
