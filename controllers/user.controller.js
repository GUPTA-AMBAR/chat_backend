import User from "../models/user.models.js";

const getUserFromSidebar = async(req ,res)=>{
    try {
        
        //get logged in user's id  and exclude password from response
        const loggedInUserId  = req.user._id;
        const filteredUsers = await User.find({_id: {$ne :loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Failed to get user from sidebar : " , error.message);
        res.status(500).json({error:"Internal server error"})
    }
}


export default getUserFromSidebar;