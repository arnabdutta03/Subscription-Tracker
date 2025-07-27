import express from "express";
const app = express();

import { PORT } from './config/env.js';



// Importing Routes
import authRoute from "./routes/auth.route.js";
import subcriptionRoute from "./routes/subcription.route.js";
import userRoute from "./routes/user.route.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.route.js";

// This allows to handle Json data sent in Req and API call
app.use(express.json());

// This allows to process the form data sent via HTML forms in a simple format
app.use(express.urlencoded({extended:false}));

// This reads cookies from incoming requests so app can store user's data 
app.use(cookieParser());

app.use(arcjetMiddleware);


// use the routes now
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/subcriptions', subcriptionRoute);
app.use('/api/v1/workflows', workflowRouter);


// use middleware
app.use(errorMiddleware)



app.get('/', (req, res) => { res.send('<body style="background-color:#2f2f2f"></body><h1 style="text-align: center; color: #fff">Wellcome to SubTracker</h1>') })

app.listen(PORT, async () => {

    try {
        // Database 
        await connectToDatabase();

        console.log(`Server is running on http://localhost:${PORT}`);

    } catch (error) {
        console.log(error)
    }
})

export default app;