import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";
import { EntityInventory } from "./entity.Inventory";
import { IInventoryResponse } from "./interface.inventory";

export const Inventory_Add = async(inventory: EntityInventory): Promise<IInventoryResponse> => {

    let inventoryResponse = await posFetcher.post<IInventoryResponse>({url: EndPoint.Inventory.Add, data: EncodeData(inventory)});
    return inventoryResponse;
}