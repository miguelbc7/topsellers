import axios from 'axios'

const requestInterceptor = config => {
  const token = localStorage.getItem('token')
  config.headers['Content-Type'] = `application/json`
  if(token) config.headers['Authorization'] = token
  return config
}


const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/'
})



instance.interceptors.request.use(requestInterceptor)

export default instance
