import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";



export const login = async (email, password) => {
    const {data} = await $host.post('auth/login', {email, password})
    localStorage.setItem('token', data.token)
    console.log(data.token)
    return jwt_decode(data.token)
}

export const registration = async (email, password) => {
    const {data} = await $host.post('auth/reg', {email, password})
    localStorage.setItem('token', data.token)
    console.log(data.token)
    return jwt_decode(data.token)
}