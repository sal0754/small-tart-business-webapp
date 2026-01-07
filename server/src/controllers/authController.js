import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../config/databaseConnection.js";

export const loginUser = async (req, res)=>{
    const { email, password } = req.body;
    try{
        const [users] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
        if(users.length === 0){
            return res.status(401).json({ message: "Invalid email or password" });
            
        }

        // extracting the first user row in the user table
        const user = users[0]

        const matched = await bcrypt.compare(password, user.hashed_password);

        if(matched === false){
            return res.status(401).json({message: "Invalid password"});
        }

        const token = jwt.sign(
        { id: user.user_id, role: user.user_role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
        );

        res.json({
        id: user.user_id,
        email: user.email,
        role: user.user_role,
        token,
        });

    }catch(err){
        res.status(500).json("Server Error");

    }
};