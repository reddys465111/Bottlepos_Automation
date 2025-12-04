import { posFetcher } from "../../pos.adapter";
import { EncodeData, EndPoint } from "../../utils";
import { ISalesPayload } from "./interface.SalesPayload";
import { ISalesResponse } from "./interface.SalesResponse";

export const Sales_Add= async(sale: ISalesPayload): Promise<ISalesResponse> => {
    const response = await posFetcher.post<ISalesResponse>({url: EndPoint.Sales.Add, data: EncodeData(sale)});
    return response.data;
}