

export interface EntityStaffAndAdmin {
    Username:       string;
    Password?:       string;
    PasswordHash?:  string;
    IsAdmin?:       boolean;
    Permissions?:   Permissions;
    Mobile?:        string;
    Birth?:         string;
    Address?:       string;
    Zipcode?:       string;
}

export enum AdminAccess {
    Yes = 'yes',
    Administrator = 'Admin',
    No = 'no'
}

export enum AdminDashboard {
    Both = 'both',
    Standard = 'standard',
    Realtime = 'realtime',
    None= 'none'
}

export interface Permissions {
    Dashboard?: {

        AdminAccess?: AdminAccess,
        AdminDashboard?: AdminDashboard,
    
        AdminReports? : { View: boolean },
        OtherStoreReports?: { View: boolean },
        Graph?: { View: boolean }
    
        Sales?:         {View?: boolean, Edit?: boolean};
        Invoices?:      {View?: boolean, Edit?: boolean};
        StoredItems?:   {View?: boolean, Edit?: boolean, Delete?: boolean};
        Stock?:         {View?: boolean, Edit?: boolean};
        Categories?:    {View?: boolean, Edit?: boolean};
        Suppliers?:     {View?: boolean, Edit?: boolean};
        Customers?:     {View?: boolean, Edit?: boolean};
        Receive?:       {View?: boolean, Edit?: boolean};
        Transfer?:      {View?: boolean, Edit?: boolean};
        Orders?:        {View?: boolean, Edit?: boolean};
        Closing?:       {View?: boolean, Edit?: boolean};
        Expense?:       {View?: boolean, Edit?: boolean};
        Assistant?:     {View?: boolean, Edit?: boolean};
        ClockInOut?:    {View?: boolean, Edit?: boolean};
        TaskManagement?:{View?: boolean, Edit?: boolean};
    }
    /** promotionsms */
    SendSMSPromotion? : { Allow?: boolean };
    POSPermissions?: {
        /** reports */
        Reports? :                  { Hide: boolean}
        /**dayreports */
        DayReports?:                { View: boolean}
        /** allowrmitems */
        RemoveItemsFromTran?:       { Allow: boolean}
        /** allowoplayback */
        AllowPlayback?:             { Allow: boolean}
        /**alloworefundtran */
        RefundTransaction?:         { Allow: boolean}
        /** allowoapplydisc */
        ApplyDiscount?: 	        { Allow: boolean}
        /** allowoexchangerefund */
        AllowExchange_Refund?:	    { Allow: boolean}
        PrintRegisterReport?:       { Regular: boolean, Short?: boolean },
        
        /** 
         * allowedititem = allow 
         * allowviewitem = view
         */
        AllowEditItem?:	            {Allow?: boolean, View?: boolean}
        /** allowadditem */
        AllowAddItem?:	            {Allow: boolean}
        /** allowcloseregister */
        AskCloseRegisterOnLogout?:  {Allow: boolean}
        /** allowsuspendrecall */
        AllowSuspend_RecallSale?:   {Allow: boolean}

    }
}
