import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getAllSubcriptions, getSubcription, createSubcription, getUserSubcriptions } from "../controllers/subcription.controller.js"

const subcriptionRoute = Router();


subcriptionRoute.get('/', authorize, getAllSubcriptions);

subcriptionRoute.get('/:id', authorize, getSubcription);

subcriptionRoute.post('/', authorize, createSubcription);

subcriptionRoute.put('/:id', (req, res)=>res.send({msg: 'UPDATE subcription'}));

subcriptionRoute.delete('/:id', (req, res)=>res.send({msg: 'DELETE subcription'}));

subcriptionRoute.get('/user/:id', authorize, getUserSubcriptions);

subcriptionRoute.put('/:id/cancel', (req, res)=>res.send({msg: 'CANCEL user subcription'}));

subcriptionRoute.get('/upcoming-renewals', (req, res)=>res.send({msg: 'GET upcoming renewals'}));

export default subcriptionRoute;