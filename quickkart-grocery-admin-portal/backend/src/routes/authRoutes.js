import {Router} from "express"; import bcrypt from "bcryptjs"; import jwt from "jsonwebtoken";
const router=Router(); const users=[];
// Temporary storage keeps this starter runnable. Replace it with PostgreSQL queries next.
router.post("/register",async(req,res)=>{const {name,email,password,role="Customer",department="Operations"}=req.body;if(!name||!email||!password)return res.status(400).json({message:"Required fields missing"});if(users.some(x=>x.email===email))return res.status(409).json({message:"Email already registered"});const passwordHash=await bcrypt.hash(password,10);const user={id:Date.now(),name,email,passwordHash,role,department};users.push(user);res.status(201).json({user:{id:user.id,name,email,role,department}})});
// Login verifies a hashed password and returns a JWT for future protected endpoints.
router.post("/login",async(req,res)=>{const {email,password}=req.body;const user=users.find(x=>x.email===email);if(!user||!(await bcrypt.compare(password,user.passwordHash)))return res.status(401).json({message:"Invalid email or password"});const token=jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET||"development_secret",{expiresIn:"1d"});res.json({token,user:{id:user.id,name:user.name,email:user.email,role:user.role,department:user.department}})});
export default router;
