import { ScenarioItems } from "../../../../utils";
import { posFetcher } from "../../../pos.adapter";
import { EndPoint, EncodeData } from "../../../utils";
import { EntityCustomer } from "./entity.Customer";
import { ICustomerData, ICustomerResponse, ICustomerResponseData, ICustomerPayload } from "./interface.Customer";


export const Customers_Get = async (customer?: EntityCustomer): Promise<EntityCustomer[]> => {
    const data = `draw=50&search%5Bvalue%5D=${customer?.Name ?? ''}`;
    const response = await posFetcher.post<ICustomerResponse<ICustomerResponseData>>({url: EndPoint.Customers.Get, data: data});
    let customers: EntityCustomer[] = [];

    response.data.data.data.forEach((item: ICustomerData) => {
        customers.push({
            id: item.id,
            Name: item.name,
            Email: item.email,
            Mobile: item.mobile,
            Points: item.points,
        });
    });
    return customers;
}

export const Customer_Get = async (data: EntityCustomer): Promise<EntityCustomer|undefined> => {
    return (await Customers_Get()).find(x => x.Name === data.Name && x.Mobile === data.Mobile);
}

export const Customer_Add = async (data: EntityCustomer): Promise<ICustomerData> => {
    const customerPayload: ICustomerPayload = {
        txWholesale: data.MaxAmountOfBalance ?? '0',
        licenseNumber: '',
        taxPayerId: '',
        email: data.Email ?? '',
        name: data.Name ?? '',
        phone: data.Mobile ?? '',
        mobile: data.Mobile ?? '',
        dob: data.DOB ?? '',
        address: data.Address ?? '',
        suburb: '',
        postcode: data.ZipCode ?? '',
        points: data.Points ?? '0',
        ishouseenable: data.HouseAccEligible ?? false,
        promotion_subscribed: data.SMSAndEmailPromotions ?? false,
        houseacclimit: data.MaxAmountOfBalance ?? '0',
        state: '',
        country: ''
    };
    const response = await posFetcher.post<ICustomerData>({ url: EndPoint.Customers.Add, data: EncodeData(customerPayload) });
    return response.data;
}

export const Customer_Edit = async (newData: EntityCustomer, oldData: ICustomerData): Promise<ICustomerData> => {
    const customerPayload: ICustomerPayload & { id: string } = {
        id: oldData.id,
        txWholesale: newData.MaxAmountOfBalance ?? oldData.houseacclimit ?? '0',
        licenseNumber: oldData.licenseNumber ?? '',
        taxPayerId: oldData.taxPayerId ?? '',
        email: newData.Email ?? oldData.email ?? '',
        name: newData.Name ?? oldData.name ?? '',
        phone: newData.Mobile?.trim() ?? oldData.phone ?? '',
        mobile: newData.Mobile?.trim() ?? oldData.mobile ?? '',
        dob: newData.DOB ?? oldData.dob ?? '',
        address: newData.Address ?? oldData.address ?? '',
        suburb: oldData.suburb ?? '',
        postcode: newData.ZipCode ?? oldData.postcode ?? '',
        points: newData.Points ?? oldData.points ?? '0',
        ishouseenable: newData.HouseAccEligible ?? (oldData.ishousepay === '1'),
        promotion_subscribed: newData.SMSAndEmailPromotions ?? (oldData.promotion_subscribed === '1'),
        houseacclimit: newData.MaxAmountOfBalance ?? oldData.houseacclimit ?? '0',
        state: oldData.state ?? '',
        country: oldData.country ?? ''
    };

    const response = await posFetcher.post<ICustomerData>({ url: EndPoint.Customers.Edit, data: EncodeData(customerPayload) });
    return response.data;
}

export const Customer_Delete = async (data: ICustomerData): Promise<void> => {
    await posFetcher.post({ url: EndPoint.Customers.Delete, data: EncodeData({ id: data.id }) });
}

export const Customers_LoadArgs = async (iCustomers: EntityCustomer[]): Promise<void> => {
    const customers = await Customers_Get();

    if(iCustomers){
        console.log('Loading Customers');
        const customersLoaded = iCustomers;
        for(let i=0; i<customersLoaded.length; i++){
            const element = customersLoaded[i];
            const customerExists = customers.find(c => 
                c.Mobile === element.Mobile
            );
            
            if(element.Delete) {
                // If customer is marked for deletion and exists, delete it
                if(customerExists) {
                    await Customer_Delete(customerExists as any);
                }
            } else if(customerExists) {
                // If customer exists and is not marked for deletion, edit it
                await Customer_Edit(element, customerExists as any);
            } else {
                // If customer doesn't exist and is not marked for deletion, add it
                await Customer_Add(element);
            }
        }
    }
}