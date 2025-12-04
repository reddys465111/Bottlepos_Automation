import { posFetcher } from "../../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../../utils";
import { EntityBottleDeposit } from "./entity.BottleDeposit";
import { IBottleDepositData, IBottleDepositList, IBottleDepositListResponse, IBottleDepositResponse } from "./interface.BottleDeposit";

/**
 * Get a bottle deposit by its name
 * @param name of the bottledeposit
 * @returns bottleDeposit data
 */
export const BottleDeposit_Get = async(name: string): Promise<IBottleDepositData | undefined> => {

    const search = `draw=10000&search%5Bvalue%5D=${name}`;

    const response = await posFetcher.post<IBottleDepositListResponse>({url: EndPoint.BottleDeposit.Get, data: search});
    // console.log(response.data.data?.data)
    const result = response.data?.data?.data ?? undefined;
    return result && result[0]
}

/**
 * Get the list of existing BottleDepoits
 */
export const BottleDeposit_List = async(): Promise<IBottleDepositData[]> => {
    const search = `draw=10000&search%5Bvalue%5D=`;

    const response = await posFetcher.get<IBottleDepositListResponse>({url: EndPoint.BottleDeposit.Get, data: search});
    const result = response.data.data?.data;
    return result ?? [];
}

export const BottleDeposit_Add = async(bottleDeposit: EntityBottleDeposit): Promise<IBottleDepositData | undefined> => {
    const bd: IBottleDepositData = {
        amount: bottleDeposit.Amount.toString(),
        name: bottleDeposit.Name,
    }

    const response = await posFetcher.post<IBottleDepositResponse>({url: EndPoint.BottleDeposit.Add, data: EncodeData(bd)});
    return response.data.data;
}

export const BottleDeposit_Edit = async(newBottleDeposit: EntityBottleDeposit, oldBottleDeposit: IBottleDepositData): Promise<IBottleDepositData | undefined> => {
    oldBottleDeposit.amount = newBottleDeposit.Amount.toString() ?? oldBottleDeposit.amount;
    const response = await posFetcher.post<IBottleDepositResponse>({url: EndPoint.BottleDeposit.Edit, data: EncodeData(oldBottleDeposit)});
    return response.data.data;
}

export const BottleDeposit_Delete = async(bottleDeposit: IBottleDepositData): Promise<boolean> => {
    let bdID: IBottleDepositData | undefined;
    if(bottleDeposit.name)
        bdID = await BottleDeposit_Get(bottleDeposit.name);
    if(bottleDeposit.id)
        bdID = {id: bottleDeposit.id}
    const response = await posFetcher.post<IBottleDepositResponse>( {url: EndPoint.BottleDeposit.delete, data: EncodeData( { id: bdID?.id } )} );
    return response.data.data ? true : false;
}