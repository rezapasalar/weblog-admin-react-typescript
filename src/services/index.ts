import axios from 'axios'
import configApp from '../config/app'

const baseURL = configApp.baseURL

const instance = axios.create({baseURL, timeout: 5000})

//instance.interceptors.request.use(config => config, error => Promise.reject(error))
instance.interceptors.response.use((config: any) => config, async error => {
    console.log(error)
    return Promise.reject(error)
})

export default instance