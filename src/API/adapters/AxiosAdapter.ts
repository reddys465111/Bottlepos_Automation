import axios, { AxiosInstance } from "axios";
import { HttpAdapter, Options } from "./HttpAdapter";
import { Session } from "../../utils/session";
import { GetPHPSESSIONID } from "../pos.adapter";
import { EndPoint } from "../utils/endPoints";
import { ur } from "@faker-js/faker";


export class AxiosAdapter implements HttpAdapter {

  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params
    })
  }
  async post<T>(req: { url: typeof EndPoint, data: string, options?: Record<string, unknown> }): Promise<{ data: T, headers: Record<string, any> }> {
    try {
      const url = Session.URL + req.url;
      const config = { headers: { 'Cookie': GetPHPSESSIONID() } };
      const response = await this.axiosInstance.post<T>(url, req.data, req.options ?? config);
      // Access both data and headers directly from response
      return {
        headers: response.headers,
        data: response.data as T
      };
    } catch (error) {
      throw new Error(`Error fetching put: ${req.url}`);
    }
  }
  async put<T>(req: { url: typeof EndPoint, data: string, options?: Record<string, unknown> }): Promise<{ data: T, headers: Record<string, any> }> {
    try {
      const url = Session.URL + req.url;
      const config = { headers: { 'Cookie': GetPHPSESSIONID() } };
      const response = await this.axiosInstance.put<T>(url, req.data, req.options ?? config);
      return {
        headers: response.headers,
        data: response.data as T
      };
    } catch (error) {
      throw new Error(`Error fetching put: ${req.url}`);
    }
  }

  async get<T>(req: { url: typeof EndPoint, data: string, options?: Record<string, unknown> }): Promise<{ data: T, headers: Record<string, any> }> {
    try {
      const url = Session.URL + req.url;
      const config = { headers: { 'Cookie': GetPHPSESSIONID() } };
      const response = await this.axiosInstance.get<T>(url, req.options ?? config);
      return {
        headers: response.headers,
        data: response.data as T
      };
    } catch (error) {
      throw new Error(`Error fetching get: ${req.url}`);
    }
  }

  async delete<T>(req: { url: typeof EndPoint, data: string, options?: Record<string, unknown> }): Promise<{ data: T, headers: Record<string, any> }> {
    try {
      const url = Session.URL + req.url;
      const config = { headers: { 'Cookie': GetPHPSESSIONID() } };
      const response = await this.axiosInstance.delete<T>(url, req.options ?? config);
      return {
        headers: response.headers,
        data: response.data as T
      };
    } catch (error) {
      throw new Error(`Error fetching get: ${req.url}`);
    }
  }
}
