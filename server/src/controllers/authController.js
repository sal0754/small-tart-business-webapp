import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../config/databaseConnection.js";

export const loginUser = async (req, res)=>{
    const { email, password } = req.body;
    try{
        const [users] = await db.query("SELECT user_id, email, hashed_password WHERE email = ?", [email]);
        if(users.length === 0){
            return res.status(401).json({ message: "Invalid email or password" });
            
        }

        // extracting the first user row in the user table
        const user = users[0]

        const matched = await bcrypt.compare(password, user.password);

        if(matched === false){
            return res.status(401).json({message: "Invalid password"});
        }

        const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
        );

        res.json({
        id: user.id,
        email: user.email,
        role: user.role,
        token,
        });

    }catch(err){
        res.status(500).json("Server Error");

    }
};