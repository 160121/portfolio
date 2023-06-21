
import {app} from './app.mjs'
import dotenv from 'dotenv';
import cloudinary from 'cloudinary'
import {connectDatabase} from './config/database.mjs'
dotenv.config({path:"./backend/config/config.env"});

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.listen(process.env.PORT,()=>{
    console.log(`server listening at port ${process.env.PORT}`);
})