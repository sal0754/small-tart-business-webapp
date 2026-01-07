
import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
    return res.status(401).json({ message: "Missing Authorization token" });
    }

    try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; 
    return next();
    } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export const adminAuth = (req, res, next) => {
    if(!req.user){
        return res.status(403).json({ message: 'Not authenticated' });


    }
    if(!req.user.role === 'ADMIN'){
        return res.status(403).json({ message: 'Access denied' });
    }
    
}