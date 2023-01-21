import axios from 'axios'

//no Android e necessario colocar o IP fisico
export const api = axios.create({
  baseURL: 'http://192.168.0.13:3333'
})

// import { create } from 'apisauce';

// export const api = create({
//   baseURL: 'http://192.168.0.13:3333',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   }
// });