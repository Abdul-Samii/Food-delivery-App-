import { Request, Response, NextFunction } from "express";
import { VendorLoginInputs } from "../dto";
import { Vendor } from "../models";
import { GenerateSignature, ValidatePassword } from "../utility";



export const VendorLogin = async (req:Request,res:Response,next:NextFunction)=>{
    const {email,password} = <VendorLoginInputs>req.body;
    const existingVendor = await Vendor.find({email});
    if(existingVendor[0] != null)
    {
        const validation = await ValidatePassword(password,existingVendor[0].password,existingVendor[0].salt);
        if(validation)
        {
            const token = GenerateSignature({
                _id:existingVendor[0].id,
                email:existingVendor[0].email,
                name:existingVendor[0].name,
                foodType:existingVendor[0].foodType,
                
            })
            res.status(200).json({"Token":token});
        }
        else{
            return res.status(400).json({"message":"Wrong Password"});
        }
    }
    return res.status(400).json({"message":"User not found!"});
}

//get vendor profile
export const GetVendorProfile = async(req:Request,res:Response,next:NextFunction)=>{
    const user = req.user;
    if(user)
    {
        const existingVendor = await Vendor.findById(user._id);
        return res.status(200).json(existingVendor);
    }
    else{
    return res.status(400).json({"message":"Vendor information not found"});
    }
}

//update vendor
export const UpdateVendorProfile = async(req:Request,res:Response,next:NextFunction)=>{
    const user = req.user;
    console.log(user);
    if(user)
    {
        const updatedUser = await Vendor.findByIdAndUpdate(user._id,req.body);
        return res.status(200).json(updatedUser);
    }
    else{
        return res.status(400).json({"message":"Something went wrong!"});
    }


}

//Update Vendor Service
export const UpdateVendorService = async(req:Request,res:Response,next:NextFunction)=>{
    const user = req.user;
    if(user)
    {
        const existingVendor = await Vendor.findById(user._id);
        if(existingVendor!==null){
            // console.log(bool);
            const bool = existingVendor.serviceAvailible;
            await Vendor.findByIdAndUpdate(existingVendor._id,{$set:{
                serviceAvailible:!bool
            }})
            return res.status(200).json("service changed");
        }
        return res.status(200).json(existingVendor);
    }
    return res.status(400).json({"message":"Vendor information not found"});
}