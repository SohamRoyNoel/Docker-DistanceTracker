import axios from "axios";
import axiosRetry from 'axios-retry';
import ApiRouters from "../../../../src/ApiRoutes.json";

export default async function apiDataReturner(body) {
    var res= [];
    var route = process.env.REACT_APP_API_ENDPOINT;
    var endPoint = ApiRouters.login_POST;

    axiosRetry(axios, { retries: 3 });
    res = await axios.post(`${route + endPoint}`, 
            body
    )
    .catch((error)=> {
        return error.response;
    })   
    return res;
}