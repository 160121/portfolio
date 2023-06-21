import mongoose from 'mongoose';
export const connectDatabase=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
       // useCreateIndex:true,
        //useFindAndModify:true

    }).then(c=>{
        console.log(`mongodb connected to ${c.connection.host}`);
    }).catch((e)=>console.log(e));
};