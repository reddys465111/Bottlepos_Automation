export interface ISizeResponse {
    errorCode: string;
    error:     string;
    data:      ISize[] | string;
}

export interface ISize {
    id?:       string;
    name:     string;
    ordernum?: string;
}
