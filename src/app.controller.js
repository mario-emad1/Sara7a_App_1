import connectDB from "./DB/connection.js";
import { authRouter, msgRouter, userRouter } from "./Modules/index.js";
import { globalErrorHandler, NotFoundException } from "./Utils/Response/error.response.js";

const bootstrap = async (app,express)=>{
// Parsing req body
    app.use(express.json());

// Connecting Database
    await connectDB();

// Routing base
    app.use('/api/v1/auth',authRouter);
    app.use('/api/v1/user',userRouter);
    app.use('/api/v1/msg',msgRouter);

// Dummy Routing
    app.use("/*dummy",(req,res)=>{
        NotFoundException({message:"Not Found Handler"})
    })

// Handling Error
    app.use(globalErrorHandler);
}

export default bootstrap;