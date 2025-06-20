import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'
import User from '../models/User.js';
import { verifyToken } from '@clerk/clerk-sdk-node';

export const protectUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    
    const decoded = await verifyToken(token);
    const user = await User.findById(decoded.sub); // Clerk uses 'sub' for user ID
    
    if (!user) throw new Error('User not found');
    
    req.auth = { userId: user._id };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};


export const protectCompany=async(req,res,next)=>{

    const token=req.headers.token

    if(!token){
        return res.json({success:false,message:'Not authorized,Login Again'})
    }
    try{

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.company=await Company.findById(decoded.id).select('-password')

    next()

    }catch(error){
        res.json({success:false,message:error.message})

    }

}