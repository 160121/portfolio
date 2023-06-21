import { sendmail } from '../middlewares/sendmail.mjs';
import {User} from '../model/User.mjs'
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary'
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        if(user.password!==password){
            return res.status(400).json({message:"password is incorrect"});
        }
        
        const token=jwt.sign({_id:User.id},process.env.JWT_SECRET);
        res
          .status(200)
          .cookie('token', token, {
            expires: new Date(Date.now() + 600000),
            httpOnly:true,
          })
          .json({ message: 'login successful' });
    }catch{
        res.status(500).json({message:"server error"});

    }
};



export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({ message: 'logged out successfully' });
  } catch {
    res.status(500).json({ message: 'server error' });
  }
};

export const getUser=async (req,res)=>{
    try{
        const user=await User.findOne().select("-password -email");
        res.status(200).json({
            success:true,
            user
        });
    }catch {
    res.status(500).json({ message: 'server error' });
  }
}

export const myprofile= async (req, res) => {
  try {
    const user = await User.findById(req.User._id)
    res.status(200).json({
      success: true,
      user,
    });
  } catch {
    res.status(500).json({ message: 'server error' });
  }
};


export const contact = async (req, res) => {
  try {
    const {name,email,message} =req.body;
    const usermessage=`Hey iam ${name}.My email is ${email}.My message is ${message}`;
    await sendmail(usermessage);
    res.status(200).json({
        success: true,
        message:"message sent successfully"
    });
  } catch {
    res.status(500).json({ message: 'server error' });
  }
};


export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.User._id);
    const {name,email,password,skills,about}=req.body;
    if(name){
        user.name=name;
    }
    if(email){
        user.email=email;
    }
    if(password){
        user.password=password;
    }
    if(skills){
        if(skills.image1){
          await cloudinary.v2.uploader.destroy(user.skills.image1.public_id)
          const myCloud=await cloudinary.v2.uploader.upload(skills.image1,{folder:"portfolio"});
          user.skills.image1.url={
            public_id:myCloud.public_id,
            url:myCloud.secure_url,

          }
        }
    }
    if(about){
        user.about.name=about.name;
        user.about.title=about.title;
        user.about.subtitle=about.subtitle;
        user.about.description=about.description;
        user.about.quote=about.quote;
        if(about.avatar){
          await cloudinary.v2.uploader.destroy(user.about.avatar.public_id)
          const myCloud=await cloudinary.v2.uploader.upload(about.avatar,{folder:"portfolio"});
          user.about.avatar.url={
            public_id:myCloud.public_id,
            url:myCloud.secure_url,

          }
        }

    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch {
    res.status(500).json({ message: 'server error' });
  }
};