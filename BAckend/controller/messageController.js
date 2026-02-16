// how to user send messages 
import { conversation } from "../model/conversation.js";
import { Message } from "../model/messagemodel.js"

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id; /// loggedin user  stored by  the middleware 
        const receiverId = req.params.id;   // taken id  // ✅ FIXED

        const { message } = req.body;
        // first generate the conversation model , make sure the hwcih two persin are chantting

        let gotConversation = await conversation.findOne({
            participants: { $all: [senderId, receiverId] },  // ✅ FIXED
        });

        if (!gotConversation) {
            gotConversation = await conversation.create({
                participants: [senderId, receiverId]  // ✅ FIXED
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,  // ✅ FIXED
            message
        })

        if (newMessage) {
            gotConversation.messages.push(newMessage._id); // here this .messages is not  the message of req.body?
            // 
        }

        await gotConversation.save(); //  this saves the conversation with the new message added to the messages array.

        return res.status(201).json({
            message: "Message sent successfully",
            data: newMessage   // addedd ag se 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });  // ✅ ADDED
    }
}
                                                                                    
// !!!!          statrt implemting SOCKET IO

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;  // ✅ FIXED , take recier id an dthen    , i am the reciever                 
        const senderId = req.id;  // i ma hte sender 

        const gotConversation = await conversation.findOne({
            participants: { $all: [senderId, receiverId] }  // ✅ FIXED
        }).populate("messages");

        return res.status(200).json(gotConversation?.messages);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};