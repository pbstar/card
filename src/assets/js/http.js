import axios from 'axios';
axios.defaults.baseURL = 'http://apinew.mcweb.top/card/';
export default {
    get (url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(response => {
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post (url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then(
                response => { resolve(response.data) },
                err => { reject(err) }
            )
        })
    }
};