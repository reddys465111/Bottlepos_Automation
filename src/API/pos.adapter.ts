import { AxiosAdapter, HttpAdapter } from '../API/adapters'
import { Session } from '../utils/session';

let PHPSESSID : string  = '';

export const SetPHPSESSIONID = (phpSESSIONID : string) =>{
    PHPSESSID = phpSESSIONID;
}

export const GetPHPSESSIONID = () => {
    return PHPSESSID;
}

export const posFetcher: HttpAdapter = new AxiosAdapter({
    baseUrl: Session.URL,
    headers: 
    {    

    }

})