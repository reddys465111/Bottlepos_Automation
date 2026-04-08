import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";
import { EntitySizes } from "./entity.sizes";
import { ISize, ISizeResponse } from "./interface.sizes";


export const Sizes_Get = async(size: {name: string}): Promise<ISize|undefined> => {
    const response = await posFetcher.post<ISizeResponse>({url: EndPoint.Sizes.Get});
    let val : ISize | undefined = undefined;
    (response.data.data as ISize[]).forEach(size=>{
        if(size.name==size.name){
            val=size;
        }
    })
    return val;
}


export const Sizes_Add = async(size: EntitySizes): Promise<{data: string, error: string, errorCode: string}> => {
    const input: ISize = { name: size.Name};
    const response = await posFetcher.post<{data: string, error: string, errorCode: string}>({url: EndPoint.Sizes.Add, data: EncodeData(input)});
    return response.data;
}

export const Sizes_Edit = async(size: EntitySizes, oldSize: ISize): Promise<ISize | string> => {
    let result : ISize | string = ''
    if(size.ReplaceName){
        oldSize.name = size.ReplaceName?? oldSize.name;
        const response = await posFetcher.post<ISizeResponse>({url: EndPoint.Sizes.Edit, data: EncodeData(oldSize)});
        result = response.data.data as string;
    }
    return result
}

export const Sizes_Delete = async(size: ISize): Promise<ISizeResponse> => {
    const response = await posFetcher.post<ISizeResponse>({url: EndPoint.Sizes.Delete, data: EncodeData(size)});
    return response.data;
}