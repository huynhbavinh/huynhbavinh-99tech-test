import axios, { AxiosInstance } from "axios";

class RestAPI {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://interview.switcheo.com',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

const rest = new RestAPI().instance;

export default rest;