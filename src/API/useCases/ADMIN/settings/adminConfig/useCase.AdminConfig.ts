import { posFetcher } from "../../../../pos.adapter";
import { EndPoint } from "../../../../utils";
import { IACData, IAdminConfig } from "./interface.AdminConfig";

export const AdminConfig_Get = async(): Promise<IACData> =>{

    const adminConfig = (await posFetcher.get<IAdminConfig>({url: EndPoint.AdminConfig.Get}));
    // console.log(adminConfig.data.data)
    return adminConfig.data.data!
}