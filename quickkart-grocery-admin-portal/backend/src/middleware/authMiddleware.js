import jwt from "jsonwebtoken";
// authenticate verifies the Bearer token sent by the React client.
export function authenticate(req,res,next){const h=req.headers.authorization;if(!h?.startsWith("Bearer "))return res.status(401).json({message:"Authentication token required"});try{req.user=jwt.verify(h.split(" ")[1],process.env.JWT_SECRET||"development_secret");next()}catch{res.status(401).json({message:"Invalid or expired token"})}}
// requireRole can be added to admin-only routes.
export function requireRole(...roles){return(req,res,next)=>roles.includes(req.user?.role)?next():res.status(403).json({message:"Permission denied"})}
