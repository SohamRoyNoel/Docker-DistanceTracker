import axios from "axios";
import axiosRetry from 'axios-retry';
import ApiRouters from "../../../../src/ApiRoutes.json";

export default async function apiDataReturner(defaultCity) {
    var res= [];
    var route = process.env.REACT_APP_API_ENDPOINT;
    var endPoint = ApiRouters.admin_Location_POST;
    let token = localStorage.getItem('_jid');

    axiosRetry(axios, { retries: 3 });
    res = await axios.post(`${route + endPoint + defaultCity}`, {  },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
    .catch((error)=> {
        return error.response;
    })   
    return res;
}