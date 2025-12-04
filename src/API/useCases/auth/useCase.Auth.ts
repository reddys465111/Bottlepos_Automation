import { GetCurrentDate } from "../../../utils";
import { Session } from "../../../utils/session";
import { posFetcher, SetPHPSESSIONID } from "../../pos.adapter";
import { EndPoint } from "../../utils";
import { EncodeData } from "../../utils/APIHelper";
import { iAuthData, IAuthResponse } from "./interface.auth";


export const Authenticate = async (props?: { user?: string, password?: string }): Promise<IAuthResponse> => {
  const credentials = { username: props?.user ?? Session.User, password: props?.password ?? Session.API.PSW };
  
  const data = EncodeData(credentials);
  const auth = (await posFetcher.post<IAuthResponse>({ url: EndPoint.AUTH, data: data }));
  if (auth.data.errorCode == 'OK' && auth.data.error == 'OK') {
    const setCookieHeader = auth.headers['set-cookie'];
    if (setCookieHeader && setCookieHeader.length > 0) {
      SetPHPSESSIONID(setCookieHeader[0].split(';')[0]);
     console.log('Session cookie set:', setCookieHeader[0].split(';')[0]);
    } else {
      console.log('No new session cookie - likely reusing existing session');
      // Don't throw an error, just continue without setting a new cookie
    }
  }
  return auth.data;
}

export const Logout = async <T extends { data: string, error: string, errorCode: string }>(): Promise<T> => {
  const logoutResponse = await posFetcher.post<T>({ url: EndPoint.LogOut, data: EncodeData({ "end_date": Date.now() }) })
  return logoutResponse.data;
}