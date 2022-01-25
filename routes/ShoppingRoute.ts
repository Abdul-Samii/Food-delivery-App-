import express from 'express';
import { GetFoodAvailibiliy, GetFoodsIn30Min, GetTopRestaurants, RestaurantById, SearchFoods } from '../controllers';
const router = express.Router();

//Food Availibility
router.get('/:pincode',GetFoodAvailibiliy);

//Top Restaurant
router.get('/top-restaurant/:pincode',GetTopRestaurants);

//Food availible in 30 Min
router.get('/foods-in-30-min/:pincode',GetFoodsIn30Min);

//Search Foods
router.get('/search/:pincode',SearchFoods);

//Find Restaurant by id
router.get('/restaurant/:id',RestaurantById);

export {router as ShoppingRoute};