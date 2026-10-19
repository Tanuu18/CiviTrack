import jwt from "jsonwebtoken";
const authMiddleware=async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(400).json({
                message:"Access Denied.No token provided"
            })
        }
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user=decoded;
        next();
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({message:"server error"});
    }
}
export default  authMiddleware;