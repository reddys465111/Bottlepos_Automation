import { AdminAccess, EntityStaffAndAdmin, IStaffAdminResponse, IStaffAdminResponseData, IStaffAdminResponseList } from ".";
import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";
import { IStaffAdminData } from "./interface.StaffAdminData";

/** Add new Staff & Admin  */
export const StaffAdmin_Add = async(user: EntityStaffAndAdmin) : Promise<IStaffAdminResponse> => {

    let data : IStaffAdminData = {
        username : user.Username,
        address : user.Address ?? '',
        admin : Number(user.IsAdmin ?? 0) ,
        api_client : '0',
        mobile : user.Mobile ?? '',
        userdob : user.Birth ?? '',
        pass : user.PasswordHash ?? '38076b9a1a153ff3bcfa0d4e6d89b6d9f1895578e0194911bce3a2d248bfe005',
        zipcode : user.Zipcode ?? '',
        permissions : {
            access: user.Permissions?.Dashboard?.AdminAccess ?? AdminAccess.Yes,
            adminreports : user.Permissions?.Dashboard?.AdminReports?.View ? 2 : 0,
            otherstorereports : Number(user.Permissions?.Dashboard?.OtherStoreReports ?? 0),
            graph : Number(user.Permissions?.Dashboard?.Graph ?? 0),
            sales : user.Permissions?.Dashboard?.Sales?.Edit? 2 : Number(user.Permissions?.Dashboard?.Sales?.View ?? 0),
            invoices : user.Permissions?.Dashboard?.Invoices?.Edit? 2 : Number(user.Permissions?.Dashboard?.Invoices?.View ?? 0),
            items : user.Permissions?.Dashboard?.StoredItems?.Edit? 2 : Number(user.Permissions?.Dashboard?.StoredItems?.View ?? 0),
            itemmodule : { delete: Number(user.Permissions?.Dashboard?.StoredItems?.Delete ?? 0) },
            stock : user.Permissions?.Dashboard?.Stock?.Edit? 2 : Number(user.Permissions?.Dashboard?.Stock?.View ?? 0),
            categories : user.Permissions?.Dashboard?.Categories?.Edit? 2 : Number(user.Permissions?.Dashboard?.Categories?.View ?? 0),
            suppliers : user.Permissions?.Dashboard?.Suppliers?.Edit? 2 : Number(user.Permissions?.Dashboard?.Suppliers?.View ?? 0),
            customers : user.Permissions?.Dashboard?.Customers?.Edit? 2 : Number(user.Permissions?.Dashboard?.Customers?.View ?? 0),
            receive : user.Permissions?.Dashboard?.Receive?.Edit? 2 : Number(user.Permissions?.Dashboard?.Receive?.View ?? 0),
            transfer : user.Permissions?.Dashboard?.Transfer?.Edit? 2 : Number(user.Permissions?.Dashboard?.Transfer?.View) ?? 0,
            orders : user.Permissions?.Dashboard?.Orders?.Edit? 2 : Number(user.Permissions?.Dashboard?.Orders?.View ?? 0),
            closing : user.Permissions?.Dashboard?.Closing?.Edit? 2 : Number(user.Permissions?.Dashboard?.Closing?.View ?? 0),
            expense : user.Permissions?.Dashboard?.Expense?.Edit? 2 : Number(user.Permissions?.Dashboard?.Expense?.View ?? 0),
            assistant : user.Permissions?.Dashboard?.Assistant?.Edit? 2 : Number(user.Permissions?.Dashboard?.Assistant?.View ?? 0),
            clockinout : user.Permissions?.Dashboard?.ClockInOut?.Edit? 2 : Number(user.Permissions?.Dashboard?.ClockInOut?.View ?? 0),
            tasklist : user.Permissions?.Dashboard?.TaskManagement?.Edit? 2 : Number(user.Permissions?.Dashboard?.TaskManagement?.View ?? 0),
            sections_control : { promotionsms : Number(user.Permissions?.SendSMSPromotion?.Allow ?? 0) },
            pos: {
                reports : user.Permissions?.POSPermissions?.Reports ? 2 : 0,
                dayreports : user.Permissions?.POSPermissions?.DayReports ? 2 : 0,
                regularregisterreports : user.Permissions?.POSPermissions?.PrintRegisterReport?.Regular? 2 : 0,
                shortregisterreports : user.Permissions?.POSPermissions?.PrintRegisterReport?.Short? 2 : 0,
                allowrmitems : Number(user.Permissions?.POSPermissions?.RemoveItemsFromTran?.Allow ?? 0),
                allowoplayback : Number(user.Permissions?.POSPermissions?.RemoveItemsFromTran?.Allow ?? 0),
                alloworefundtran : Number(user.Permissions?.POSPermissions?.RefundTransaction?.Allow ?? 0),
                allowoapplydisc : Number(user.Permissions?.POSPermissions?.ApplyDiscount?.Allow ?? 0),
                allowoexchangerefund : Number(user.Permissions?.POSPermissions?.AllowExchange_Refund?.Allow ?? 0),
                allowedititem : Number(user.Permissions?.POSPermissions?.AllowEditItem?.Allow ?? 0),
                allowviewitem : Number(user.Permissions?.POSPermissions?.AllowEditItem?.Allow ?? 0),
                allowadditem : Number(user.Permissions?.POSPermissions?.AllowAddItem?.Allow ?? 0),
                allowcloseregister : Number(user.Permissions?.POSPermissions?.AskCloseRegisterOnLogout?.Allow ?? 0),
                allowsuspendrecall : Number(user.Permissions?.POSPermissions?.AllowSuspend_RecallSale?.Allow ?? 0)
            }
        }
    }
    const response = await posFetcher.post<IStaffAdminResponse>({url: EndPoint.StaffAdmin.Add, data: EncodeData(data)});
    return response.data;
}

export const StaffAdmin_Edit = async(newUserData: EntityStaffAndAdmin, oldUserData: IStaffAdminResponseData): Promise<IStaffAdminResponse> => {
    let data : IStaffAdminData = {
        ...oldUserData,
        id: oldUserData.id,
        username : newUserData.Username ?? oldUserData.username,
        address : newUserData.Address ?? oldUserData.address ?? '',
        admin : Number(newUserData.IsAdmin ?? oldUserData.admin) ,
        api_client : oldUserData.api_client ?? '0',
        mobile : newUserData.Mobile ?? oldUserData.mobile ?? '',
        userdob : newUserData.Birth ?? oldUserData.dob ?? '',
        
        pass : newUserData.PasswordHash ?? '38076b9a1a153ff3bcfa0d4e6d89b6d9f1895578e0194911bce3a2d248bfe005',
        zipcode : newUserData.Zipcode ?? oldUserData.zipcode ?? '',
        permissions : {
            dashboard: newUserData.Permissions?.Dashboard?.AdminDashboard ?? oldUserData.permissions?.sections.dashboard ?? 'both',
            access  : newUserData.Permissions?.Dashboard?.AdminAccess ?? oldUserData.permissions?.sections.access ?? 'admin',
            adminreports : Number(newUserData.Permissions?.Dashboard?.AdminReports?.View) ?? oldUserData.permissions?.sections.adminreports,
            otherstorereports : Number(newUserData.Permissions?.Dashboard?.OtherStoreReports?.View ?? oldUserData.permissions?.sections.otherstorereports),
            graph : Number(newUserData.Permissions?.Dashboard?.Graph?.View ?? oldUserData.permissions?.sections.graph),
            sales : newUserData.Permissions?.Dashboard?.Sales?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Sales?.View ?? oldUserData.permissions?.sections.sales),
            invoices : newUserData.Permissions?.Dashboard?.Invoices?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Invoices?.View ?? oldUserData.permissions?.sections.invoices),
            items : newUserData.Permissions?.Dashboard?.StoredItems?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.StoredItems?.View ?? oldUserData.permissions?.sections.items),
            itemmodule : { delete: Number(newUserData.Permissions?.Dashboard?.StoredItems?.Delete ?? oldUserData.permissions?.sections.itemmodule.delete ?? 0) },
            stock : newUserData.Permissions?.Dashboard?.Stock?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Stock?.View ?? oldUserData.permissions?.sections.stock ?? 0),
            categories : newUserData.Permissions?.Dashboard?.Categories?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Categories?.View ?? oldUserData.permissions?.sections.categories ?? 0),
            suppliers : newUserData.Permissions?.Dashboard?.Suppliers?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Suppliers?.View ?? oldUserData.permissions?.sections.suppliers ?? 0),
            customers : newUserData.Permissions?.Dashboard?.Customers?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Customers?.View ?? oldUserData.permissions?.sections.customers ?? 0),
            receive : newUserData.Permissions?.Dashboard?.Receive?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Receive?.View ?? oldUserData.permissions?.sections.receive ?? 0),
            transfer : newUserData.Permissions?.Dashboard?.Transfer?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Transfer?.View) ?? oldUserData.permissions?.sections.transfer ?? 0,
            orders : newUserData.Permissions?.Dashboard?.Orders?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Orders?.View ?? oldUserData.permissions?.sections.orders ?? 0),
            closing : newUserData.Permissions?.Dashboard?.Closing?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Closing?.View ?? oldUserData.permissions?.sections.closing ?? 0),
            expense : newUserData.Permissions?.Dashboard?.Expense?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Expense?.View ?? oldUserData.permissions?.sections.expense) ?? 0,
            assistant : newUserData.Permissions?.Dashboard?.Assistant?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.Assistant?.View ?? oldUserData.permissions?.sections.assistant ?? 0),
            
            clockinout : newUserData.Permissions?.Dashboard?.ClockInOut?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.ClockInOut?.View ?? oldUserData.permissions?.sections.clockinout),
            tasklist : newUserData.Permissions?.Dashboard?.TaskManagement?.Edit? 2 : Number(newUserData.Permissions?.Dashboard?.TaskManagement?.View ?? oldUserData.permissions?.sections.tasklist),
            sections_control : { promotionsms : Number(newUserData.Permissions?.SendSMSPromotion?.Allow ?? oldUserData.permissions?.sections_control.promotionsms) },
            
            pos: {
                reports : Number(newUserData.Permissions?.POSPermissions?.Reports?.Hide ? 2 : oldUserData.permissions?.pospermissions['reports']),
                dayreports : newUserData.Permissions?.POSPermissions?.DayReports?.View ? 2 : oldUserData.permissions?.pospermissions['dayreports'] ?? 0,
                regularregisterreports : newUserData.Permissions?.POSPermissions?.PrintRegisterReport?.Regular? 2 : oldUserData.permissions?.pospermissions['regularregisterreports'] ?? 0,
                shortregisterreports : newUserData.Permissions?.POSPermissions?.PrintRegisterReport?.Short? 2 : oldUserData.permissions?.pospermissions['shortregisterreports'] ?? 0,
                allowrmitems : Number(newUserData.Permissions?.POSPermissions?.RemoveItemsFromTran?.Allow ?? oldUserData.permissions?.pospermissions['allowrmitems']),
                allowoplayback : Number(newUserData.Permissions?.POSPermissions?.RemoveItemsFromTran?.Allow ??  oldUserData.permissions?.pospermissions['allowoplayback']),
                alloworefundtran : Number(newUserData.Permissions?.POSPermissions?.RefundTransaction?.Allow ??  oldUserData.permissions?.pospermissions['alloworefundtran']),
                allowoapplydisc : Number(newUserData.Permissions?.POSPermissions?.ApplyDiscount?.Allow ??  oldUserData.permissions?.pospermissions['allowoapplydisc']),
                allowoexchangerefund : Number(newUserData.Permissions?.POSPermissions?.AllowExchange_Refund?.Allow ??  oldUserData.permissions?.pospermissions['allowoexchangerefund']),
                allowedititem : Number(newUserData.Permissions?.POSPermissions?.AllowEditItem?.Allow ??  oldUserData.permissions?.pospermissions['allowedititem']),
                allowviewitem : Number(newUserData.Permissions?.POSPermissions?.AllowEditItem?.Allow ??  oldUserData.permissions?.pospermissions['allowviewitem']),
                allowadditem : Number(newUserData.Permissions?.POSPermissions?.AllowAddItem?.Allow ??  oldUserData.permissions?.pospermissions['allowadditem']),
                allowcloseregister : Number(newUserData.Permissions?.POSPermissions?.AskCloseRegisterOnLogout?.Allow ??  oldUserData.permissions?.pospermissions['allowcloseregister']),
                allowsuspendrecall : Number(newUserData.Permissions?.POSPermissions?.AllowSuspend_RecallSale?.Allow ??  oldUserData.permissions?.pospermissions['allowsuspendrecall'])
            }
        }
    }
    const response = await posFetcher.post<IStaffAdminResponse>({url: EndPoint.StaffAdmin.Edit, data: EncodeData(data)});
    return response.data;
}
/** Search a Staff by its Username */
export const StaffAdmin_List = async():Promise<IStaffAdminResponseData[] | undefined> => {
    const response = await posFetcher.get<IStaffAdminResponseList>({url: EndPoint.StaffAdmin.List});
    let userList : IStaffAdminResponseData[] = [];
    for(const id in response.data.data){
        userList.push(response.data.data[id]);
    }
    return userList;
}

/** Get the user data given its username or undefined if not exits*/
export const StaffAdmin_Get = async(username: string): Promise<IStaffAdminResponseData | undefined> => {
    const userList = await StaffAdmin_List();
    let result : IStaffAdminResponseData | undefined = undefined;
    if(userList) {
       userList.forEach( user => {
            if( user.username==username ){
                result = user;
            }
       });
    }
    return result;
}

/** Disable a staff by its Username */
export const StaffAdmin_Disable = async(options: {user: string, enable: boolean}): Promise<Boolean> => {


    // const searchUser : IStaffAdminData = {}
    // const data= {"id": searchUser.id,"disable": options.enable};
    // let disableUserResponse: IStaffAdminResponse = {}
    // try{
    //     const response = await posFetcher.post<IStaffAdminResponse>({url: EndPoint.StaffAdmin_Disable, data: EncodeData(data)});
    //     disableUserResponse = response.data;
    // }catch(e){

    // }

    // return disableUserResponse.error == 'OK' && disableUserResponse.errorCode =='OK'
    return false;

}

/** Diable a Staff by its Username */
export const DeleteUser = async(): Promise<void> => {


}

export const StaffAdmin_LoadArgs = async(staff_admin: EntityStaffAndAdmin[]): Promise<void> => {
    // const resp: IStaffAdminResponse[] = [];
    if (staff_admin) {
        console.log('Loading Staff and Admins');
    }
    for await (const val of staff_admin) {
        
        let user = await StaffAdmin_Get(val?.Username);
        if(user == undefined){
            try {
                await StaffAdmin_Add(val);
            } catch (error) {
                console.log('Error adding user: ', error);
            }    
        
        }else{
            try {
                const edited = await StaffAdmin_Edit(val, user);
            } catch (error) {
                console.log('Error editing user: ', error);
            }
        }
        // if(user) resp.push(user);

    }
}
