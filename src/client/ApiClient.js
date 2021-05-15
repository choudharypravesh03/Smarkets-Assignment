import axios from 'axios'
import { getAppError } from './ApiErrorHandler'

const getInstance = (timeout = 8000) => {
    return axios.create({
      baseURL: 'https://api.smarkets.com/v3/',
      timeout
    })
}


const ApiClient = {
    get: async (path) => {
        try {
        const api = getInstance()
        console.log('path -> ', path)
        const response = await api.get(path)
        return { data: response.data, status: response.status }
        } catch (error) {
        throw getAppError(error)
        }
    } 
}
  
export default ApiClient
  