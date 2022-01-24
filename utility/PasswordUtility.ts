import {Request,Response,NextFunction} from 'express';
import bcrypt from 'bcrypt';
import { AuthPayload, VendorPayload } from '../dto';
import jwt, { sign } from 'jsonwebtoken';
import { APP_SIGNATURE } from '../config';

export const GenerateSalt = async () =>{
    return await bcrypt.genSalt()
}

export const GeneratePassword = async (password:string,salt:string) =>{
    return await bcrypt.hash(password,salt);
}

export const ValidatePassword=async(enteredPassword:string, savedPassword:string,salt:string)=>{
    return await GeneratePassword(enteredPassword,salt) === savedPassword;
}

export const GenerateSignature = (payload:VendorPayload) =>{
    return jwt.sign(payload,APP_SIGNATURE,{expiresIn:'1d'})
}

export const ValidateSignature = async(req:Request)=>{
    const signature = req.get('Authorization');
    if(signature)
    {
        try{
        const payload = await jwt.verify(signature.split(' ')[1],APP_SIGNATURE) as AuthPayload;
        req.body = payload;
        return true;   
    }
        catch(err)
        {
            console.log("invalid token")
            return false
        }
        
        
       
    }
    return false;
}