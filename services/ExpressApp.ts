import express,{Application} from 'express';
import bodyParser from 'body-parser';
import { AdminRoute, ShoppingRoute, VendorRoute } from '../routes';
import path from 'path';


export default async (app:Application)=>{

//uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/images',express.static(path.join(__dirname,'images')));

//Routes
app.use('/admin',AdminRoute);
app.use('/vendor',VendorRoute);
app.use(ShoppingRoute);


    return app;
}