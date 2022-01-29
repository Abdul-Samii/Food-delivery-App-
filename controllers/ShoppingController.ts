import express,{Request,Response,NextFunction} from 'express';
import { FoodDoc, Vendor } from '../models';


//Get food availibiliy
export const GetFoodAvailibiliy = async(req:Request,res:Response,next:NextFunction)=>{
    const pincode = await req.params.pincode;
    const result = await Vendor.find({pincode:pincode})
    .sort([['rating','descending']])
    .populate("foods")

    if(result.length>0){
        return res.status(200).json(result);
    }
    return res.status(400).json({"message":"No data found"});

}


//Get top restaurant
export const GetTopRestaurants = async(req:Request,res:Response,next:NextFunction)=>{

    const pincode = await req.params.pincode;
    const result = await Vendor.find({pincode:pincode})
    .sort([['rating','descending']])
    .limit(1);

    if(result.length>0)
    {
        return res.status(200).json(result);
    }
    return res.status(400).json({'message':'No Data Found'});

}


//Get Food in 30 minutes
export const GetFoodsIn30Min = async(req:Request,res:Response,next:NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vendor.find({pincode:pincode})
    .populate("foods");
    
    if(result.length>0)
    {
        let foodResult: any = [];
        result.map(vendor=>{
            const foods = vendor.foods as [FoodDoc];
            foodResult.push(...foods.filter(food => food.readyTime <= 30));
        })
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({"message":"No Food Available"});
}


//Search Foods
export const SearchFoods = async(req:Request,res:Response,next:NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vendor.find({pincode:pincode})
    .populate("foods");

    if(result.length>0)
    {
        let foods: any = [];

        result.map(item=>foods.push(...item.foods))

        return res.status(200).json(foods);
    }
    res.status(400).json({"message":"No Food Available"});

}


//Restaurant by Id
export const RestaurantById = async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    const result = await Vendor.findById(id).populate("foods");

    if(result)
    {
        return res.status(200).json(result);
    }
    return res.status(400).json({"message":"No Data Available"});
}