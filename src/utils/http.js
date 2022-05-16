import axios from "axios"

const BASE_URL = '/api'

const http = axios.create({
      baseURL: BASE_URL,
      timeout: 5000
    })


export default http
