import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async (req, res) => {

    try {
        console.log("request body :" , req.body);
        
        const { fullName, username, password,confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            console.log(400, "Passwords do not match");
            return res.status(400).json({ error: "Passwords do not match" });
        }
        // console.log("User  :" ,User.findOne({username}) );
        
        const user = await User.findOne({ username });        

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        //hashing the password 
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        // Add unique profile picture based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if(newUser){
            
            
            generateTokenAndSetCookie(newUser._id , res)           // genterate the jwt token
            await newUser.save()

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
        }
        else{
            console.log("Error in saving user");
            return res.status(500).json({ error: "Internal Server Error" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const login = async (req,res)=>{
    try {
        const {username , password}= req.body;
        const user  = await User.findOne({username});
        const isPasswordCorrect = bcrypt.compare(password , user?.password || "");
    
        if(!user ||!isPasswordCorrect){
            console.log(401, "Invalid credentials");
            return res.status(401).json({error: "Invalid credentials"});
        }
        generateTokenAndSetCookie(user._id, res);
    
        return res
        .status(200)
        .json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
 }

export const logout = async(req,res)=>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
