import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId , res)=>{
    const token = jwt.sign({userId} , process.env.JWT_SECRET,{
        expiresIn: "15d"
    })

    res.cookie("jwt" , token , {
        httpOnly: true,
        secure: true,
        sameSite : "strict",
        maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
    })

    // console.log("Generated JWT Token:", token);
}

export default generateTokenAndSetCookie;