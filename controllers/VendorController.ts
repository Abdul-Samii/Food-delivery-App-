import { Request, Response, NextFunction } from "express";
import { VendorLoginInputs } from "../dto";
import { Vendor } from "../models";
import { ValidatePassword } from "../utility";



export const VendorLogin = async (req:Request,res:Response,next:NextFunction)=>{
    const {email,password} = <VendorLoginInputs>req.body;
    const existingVendor = await Vendor.find({email});
    console.log(existingVendor)
    if(existingVendor[0] != null)
    {
        const validation = await ValidatePassword(password,existingVendor[0].password,existingVendor[0].salt);
        if(validation)
        {
            return res.status(200).json({"message":"Login Success!"});
        }
        else{
            return res.status(400).json({"message":"Wrong Password"});
        }
    }
    return res.status(400).json({"message":"User not found!"});
}