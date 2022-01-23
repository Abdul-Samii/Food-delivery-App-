import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { AdminRoute, VendorRoute } from './routes';
import {MONGO_URI} from './config';

const app = express();

//uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//Routes
app.use('/admin',AdminRoute);
app.use('/vendor',VendorRoute);


//connection
mongoose.connect(MONGO_URI).then(result=>{
    console.log("Connected!!!")
}).catch(err=>console.log("Error ",err))


app.listen(7000, ()=>{
    console.clear()
    console.log("App runnng at Port 7000");
})