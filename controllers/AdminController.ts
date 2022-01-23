import {Request,Response,NextFunction} from 'express'
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';

export const CreateVendor = async(req:Request,res:Response,next:NextFunction)=>{
    const {name,address,pincode,foodType,email,password,ownerName,phone} = <CreateVendorInput>req.body;
    const alreadyVendor = await Vendor.find({email:email});
    // if(alreadyVendor != null)
    // {
    //     console.log(alreadyVendor[0].email)
    //     res.status(400).json("Error! A Vendor with this email already exist")
    // }
   

    
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
        salt:salt
    });
    return res.status(200).json(createVendor);
}



export const GetVendors = async(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json("Get All Vendors List here...");
}


export const GetVendorByID = async(req:Request,res:Response,next:NextFunction)=>{

}