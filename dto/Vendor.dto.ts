export interface CreateVendorInput{
    name:string;
    ownerName:string;
    foodType:[string];
    pincode:string;
    address:string;
    phone:string;
    email:string;
    password:string;
    serviceAvailible:boolean;
    rating:number;
}

export interface VendorLoginInputs{
    email:string;
    password:string;
}

export interface VendorPayload{
    _id:string;
    email:string;
    name:string;
    foodType:[string];
}