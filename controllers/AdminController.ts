import {Request,Response,NextFunction} from 'express'
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';

export const CreateVendor = async(req:Request,res:Response,next:NextFunction)=>{
    const {name,address,pincode,foodType,email,password,ownerName,phone} = <CreateVendorInput>req.body;
    const alreadyVendor = await Vendor.find({email:email});
    if(alreadyVendor[0] != null)
    {
        res.status(400).json("Error! A Vendor with this email already exist")
    }
   else{

    
        //generate a salt
            const salt =await GenerateSalt()
        //encrypt the password using salt
            const hashPassword = await GeneratePassword(password,salt);

    const createVendor = await Vendor.create({
        name:name,
        address:address,
        pincode:pincode,
        foodType:foodType,
        email:email,
        password:hashPassword,
        ownerName:ownerName,
        phone:phone,
        serviceAvailible:false,
        salt:salt
    });
     res.status(200).json(createVendor);
}
}


//all vendors display
export const GetVendors = async(req:Request,res:Response,next:NextFunction)=>{
    const vendors = await Vendor.find()
    if(vendors !== null)
    {
        return res.status(200).json(vendors)
    }
    else{
        return res.status(400).json({"message":"No Vendors Found!"});
    }
}

//find vendor by id
export const GetVendorByID = async(req:Request,res:Response,next:NextFunction)=>{
    const vendorId = req.params.id;
    const vendor = await Vendor.findById(vendorId)

    if(vendor!==null)
    {
        return res.status(200).json(vendor);
    }
    return res.status(400).json({"message":"No Vendor Found!"});
}