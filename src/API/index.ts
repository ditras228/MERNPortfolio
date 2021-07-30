import axios from 'axios'
export const baseURL= 'http://localhost:5000/'
export const instance = axios.create({
    baseURL: baseURL
})

export const indexAPI={
    getInfo(){
        return instance.get('/')
    },
    getWorks(){
        return instance.get('/works')
    },
    updateInfo(data: any){
        return instance.post('/info', data)
    },
    addWork(data: any){
        return instance.post('/works', data)
    },
    deleteWork(id: string){
        return instance.delete(`/works?${id}`)
    }
}