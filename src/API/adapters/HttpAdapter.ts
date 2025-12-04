import { EndPoint } from '../utils';
export interface Options {
    baseUrl: string;
    params?: Record<string, string>;
    headers?: Record<string, string>;
}

export abstract class HttpAdapter {

    // IGNORE THE TYPESCRIPT ERROR OF THE ENDPOINT URL TYPE
    abstract get<T>(req: { url: EndPoint, data?: {}, options?: Record<string, unknown> }): Promise<{ data: T, headers: Record<string, any> }>;
    abstract put<T>(req: { url: EndPoint, data?: {}, options?: Record<string, unknown> }): Promise<{ data: T, headers: Record<string, any> }>;
    abstract post<T>(req: { url: EndPoint, data?: {}, options?: Record<string, unknown> }): Promise<{ data: T, headers: Record<string, any> }>;
    abstract delete<T>(req: { url: EndPoint, data?: {}, options?: Record<string, unknown> }): Promise<{ data: T, headers: Record<string, any> }>;
}