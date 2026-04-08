import { posFetcher } from "../../../../../pos.adapter";
import { DecodeData, EncodeData, EndPoint } from "../../../../../utils";
import { EntityAdditionalFees } from "./entity.AdditionalFees";
import { IAdditionalFees, IAdditionalFeesData, IAdditionalFeesResponse, IAdditionalFeesUnit } from "./interface.AdditionalFees";


export const AdditionalFees_Get = async (name: string): Promise<IAdditionalFeesData|undefined> => {
    // const search = `draw=100&search%5Bvalue%5D=${name}`;
    const search = `{"additional_charges/get": ""}`;

    const response = await posFetcher.post<IAdditionalFees<IAdditionalFeesResponse>>({url: EndPoint.AdditionalFees.Get, data: search});

    const listFees = response.data?.data;
    if(listFees){
        for (const fee of Object.values(listFees)) {
            if (fee.name?.toLowerCase() === name.toLowerCase()) {
                const feeData: IAdditionalFeesData = {
                    amount: fee.amount,
                    enabletaxableadditional: Number(fee.taxable ?? 0),
                    name: fee.name,
                    type: fee.type,
                    id: fee.id
                }
                return feeData;
            }
        }
    }
    
    return undefined; 
}

export const AdditionalFees_Add = async(additionalFee: EntityAdditionalFees): Promise<IAdditionalFees<IAdditionalFeesData>> => {
    const addFee: IAdditionalFeesData = {
        amount : additionalFee.Value?.toString(),
        enabletaxableadditional: Number(additionalFee.Taxable ?? 0),
        name: additionalFee.Name,
        type: additionalFee.Type,
    }

    const response = await posFetcher.post<IAdditionalFees<IAdditionalFeesData>>({url: EndPoint.AdditionalFees.Add, data: EncodeData(addFee)});
    return response.data
}


export const AdditionalFees_Edit = async(newAdditionalFees: EntityAdditionalFees, oldAdditionalFees: IAdditionalFeesData) => {
    oldAdditionalFees.amount = newAdditionalFees.Value?.toString() ?? oldAdditionalFees.amount;
    oldAdditionalFees.enabletaxableadditional = Number(newAdditionalFees.Taxable ?? oldAdditionalFees.enabletaxableadditional);
    oldAdditionalFees.type = newAdditionalFees.Type ?? oldAdditionalFees.type;

    const response = await posFetcher.post<IAdditionalFees<IAdditionalFeesData>>({url: EndPoint.AdditionalFees.Edit, data: EncodeData(oldAdditionalFees)})
}

export const AdditionalFees_Delete = async(options: IAdditionalFeesData): Promise<IAdditionalFeesData| undefined> => {
    
    let fee : IAdditionalFeesData | undefined= undefined;
    if(options.name)
        fee = await AdditionalFees_Get(options.name);
    if(options.id)
        fee = {id: options.id.toString()}
    // console.log(fee)
    let response =  await posFetcher.post<IAdditionalFees<IAdditionalFeesData>>({url: EndPoint.AdditionalFees.Delete, data: EncodeData(fee)})
    // console.log(response.data)
    return response?.data.data
}

