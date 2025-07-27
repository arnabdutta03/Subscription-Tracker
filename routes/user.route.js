import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.get('/', authorize, getUsers);

userRoute.get('/:id', authorize, getUser);

userRoute.post('/', (req, res) => res.send({ msg: 'CREATE new User' }));

userRoute.put('/:id', (req, res) => res.send({ msg: 'UPDATE User' }));

userRoute.delete('/:id', (req, res) => res.send({ msg: 'DELETE User' }));


export default userRoute;