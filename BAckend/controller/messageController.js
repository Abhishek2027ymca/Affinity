// how to user send messages 
import { conversation } from "../model/conversation.js";
import { Message } from "../model/messagemodel.js"

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id; /// loggedin user  stored by  the middleware 
        const receiverId = req.params.id;   // taken id 

        const { message } = req.body;
        // first generate the conversation model , make sure the hwcih two persin are chantting

        let gotConversation = await conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!gotConversation) {
            gotConversation = await conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            gotConversation.messages.push(newMessage._id); // here this .messages is not  the message of req.body?
            // 
        }

        await gotConversation.save(); //  this saves the conversation with the new message added to the messages array.

        return res.status(201).json({ newMessage });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}

// !!!!          statrt implemting SOCKET IO

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        const gotConversation = await conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        return res.status(200).json(gotConversation?.messages);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};