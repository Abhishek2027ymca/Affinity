
import { conversation } from "../model/conversation.js";
import { Message } from "../model/messagemodel.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id; // logged in user (from middleware)
        const receiverId = req.params.id; // from URL params
        const { message } = req.body;

        // Find or create conversation between these two users
        let gotConversation = await conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!gotConversation) {
            gotConversation = await conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // Add message to conversation
        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        }

        await gotConversation.save();

        return res.status(201).json({ newMessage });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

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