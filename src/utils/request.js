import axios from 'axios';

const request = axios.create({
    baseURL: 'https://7d0b-42-113-128-112.ap.ngrok.io',
    headers: {"Access-Control-Allow-Origin": "*"} 
});
export const post = async (path, option= []) => {
    const response = await request.post(path, option, )
    return response.data;
}
export const get = async (path, option= []) => {
    const response = await request.get(path, option)
    return response.data;
}

export default request;