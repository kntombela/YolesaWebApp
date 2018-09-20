import { AddressType } from "./addressTypeEnum";

export class Address {
    id: number;       
    addressType: AddressType;         
    addressLine1: string;   
    addressLine2: string;    
    AddressLine3: string;   
    suburb: string;           
    city: string;         
    province: string;         
    country: string;         
    postalCode: string;  
    memberID: number;       
}