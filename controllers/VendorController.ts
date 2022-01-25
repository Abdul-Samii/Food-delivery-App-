import { Request, Response, NextFunction } from "express";
import { CreateFoodInputs, CreateVendorInput, VendorLoginInputs } from "../dto";
import { Food, Vendor } from "../models";
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

//updateVendorCoverImage
export const UpdateVendorCoverImage = async(req:Request,res:Response,next:NextFunction)=>{
    const user = req.user;
    if(user)
    {
        const vendor = await Vendor.findById(user._id);
        if(vendor !== null)
        {
            
            const files = req.files as [Express.Multer.File]
            const images = files.map((file:Express.Multer.File)=>file.filename);

            vendor.coverImage.push(...images);
            const result = await vendor.save();
            return res.status(200).json(result);
        }
    }
    return res.status(400).json({"message":"Something went wrong"});
}



//Update Vendor Service
export const UpdateVendorService = async(req:Request,res:Response,next:NextFunction)=>{
    const user = req.user;
    if(user)
    {
        const existingVendor = await Vendor.findById(user._id);
        if(existingVendor!==null){
            // console.log(bool);
            const bool = existingVendor.serviceAvailable;
            await Vendor.findByIdAndUpdate(existingVendor._id,{$set:{
                serviceAvailible:!bool
            }})
            return res.status(200).json("service changed");
        }
        return res.status(200).json(existingVendor);
    }
    return res.status(400).json({"message":"Vendor information not found"});
}

//Add Food
export const AddFood = async(req:Request,res:Response,next:NextFunction)=>{
    const user = req.user;
    if(user)
    {
        const {name,description,category,foodType,readyTime,price} = <CreateFoodInputs>req.body;
        const vendor = await Vendor.findById(user._id)
        if(vendor!==null)
        {
            const files = req.files as [Express.Multer.File]
            const images = files.map((file:Express.Multer.File)=>file.filename);            
            const createdFood = await Food.create({
                vendorId:vendor._id,
                name:name,
                description:description,
                category:category,
                foodType:foodType,
                images:images,
                readyTime:readyTime,
                price:price,
                rating:0
            })
            vendor.foods.push(createdFood);
            const result = await vendor.save();
            return res.status(200).json(result);
        }
    }
    return res.status(400).json({"message":"Vendor information not found"});
}

//get all Foods
export const GetFoods = async(req:Request,res:Response,next:NextFunction)=>{
    const user = req.user;
    if(user){
        const foods = await Food.find({vendorId:user._id});
        if(foods!==null)
        {
            return res.status(200).json(foods)
        }
        return res.status(400).json({"message":"No Food Availible"});

    }
    return res.status(400).json({"message":"Foods information not found"});
}