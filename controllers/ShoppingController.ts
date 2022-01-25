import express,{Request,Response,NextFunction} from 'express';
import { Vendor } from '../models';


//Get food availibiliy
export const GetFoodAvailibiliy = async(req:Request,res:Response,next:NextFunction)=>{
    const pincode = await req.params.pincode;
    const result = await Vendor.find({pincode:pincode}).populate("food");
    // .sort([['rating','descending']])
    // .populate("email")

    if(result.length>0){
        return res.status(200).json(result);
    }
    return res.status(400).json({"message":"No data found"});

}


//Get top restaurant
export const GetTopRestaurants = async(req:Request,res:Response,next:NextFunction)=>{

}


//Get Food in 30 minutes
export const GetFoodsIn30Min = async(req:Request,res:Response,next:NextFunction)=>{

}


//Search Foods
export const SearchFoods = async(req:Request,res:Response,next:NextFunction)=>{

}


//Restaurant by Id
export const RestaurantById = async(req:Request,res:Response,next:NextFunction)=>{

}