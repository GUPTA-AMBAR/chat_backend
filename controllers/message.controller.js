import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId,io } from "../socket.io/socket.js";




const sendMessage=async(req, res)=>{
        try {
            const {message}=req.body;
            const senderId=req.user._id;
            const {id: receiverId}=req.params;
        
            let conversation =await Conversation.findOne({
                participants:{
                    $all:[senderId, receiverId]
                }
            })
        
            if(!conversation){
                conversation = await Conversation.create({
                    participants :[senderId, receiverId],
                    messages:[]
                })
            }
        
            const newMessage =await Message.create({
                senderId,
                receiverId,
                message
            })
            // console.log("newMessage : ", newMessage);
            
            if(newMessage){
                conversation.messages.push(newMessage._id);
            }
        
            await Promise.all([conversation.save(), newMessage.save()]);
        

            //apply the socket functionality
            const receiverSocketId = getReceiverSocketId(receiverId);
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage",newMessage);
            }
            //socket functionality end here;


            res.status(200).json(newMessage);
        } catch (error) {
            console.log("error in sendMessage route",error.message);
            res.status(500).json({error : "internal server error"});
        }
    }


const getMessage = async(req,res)=>{
    try {

        const {id : userToSendId} = req.params;
        let senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{
                $all:[senderId, userToSendId]
            }
        }).populate("messages");                                   //this populate message is just changing the refernce into yhe original message

        if (!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages);


    } catch (error) {
        console.log("error in getMessage route",error.message);
        res.status(500).json({error : "internal server error"});
    }
}    
    
export default sendMessage;
export {getMessage};