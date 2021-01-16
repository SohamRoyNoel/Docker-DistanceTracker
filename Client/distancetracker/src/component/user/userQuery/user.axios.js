import axios from "axios";
import axiosRetry from 'axios-retry';
import ApiRouters from "../../../../src/ApiRoutes.json";

export default async function apiDataReturner(targetCity) {
    var res= [];
    var route = process.env.REACT_APP_API_ENDPOINT;
    var endPoint = ApiRouters.user_Location_GET;
    let token = localStorage.getItem('_jid');

    axiosRetry(axios, { retries: 3 });
    res = await axios.get(`${route + endPoint + targetCity}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
    .catch((error)=> {
        return error.response;
    })   
    return res;
}