import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'
import User from '../models/User.js';



export const protectUser = async (req, res, next) => {
  console.log('Authorization Header:', req.headers.authorization); // Log the token
  
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Extracted Token:', token); // Verify token exists
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Check if Clerk user ID is here
    
    const user = await User.findById(decoded.id);
    console.log('Found User:', user); // Should NOT be null
    
    if (!user) {
      console.error('User missing in DB but token valid!');
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    req.auth = { userId: user._id };
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
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