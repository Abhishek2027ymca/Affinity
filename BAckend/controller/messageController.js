// how to user send messages 
import { conversation } from "../model/conversation.js";
import {Message} from "../model/messagemodel.js"

export const sendMessage = async (req, res)=>{


    try{
        const senderId  = req.id; /// loggedin user  stored by  the middleware 
        const recieverId = req.params.id ;   // taken id 

        const {message} = req.body ;
        // first generate the conversation model , make sure the hwcih two persin are chantting

        let gotConversation = await conversation.findOne({
     participants : {$all  : [senderId , recieverId]},
        });

        if(!gotConversation){
            gotConversation = await conversation.create({
                participants    : [senderId , recieverId ]
            })
        }

        const newMessage = await Message.create({
            senderId ,
            recieverId , 

            message 
        })

        if(newMessage){
            gotConversation.messages.push(newMessage._id); // here this .messages is not  the message of req.body?
               // 
        }

        await gotConversation.save(); //  this saves the conversation with the new message added to the messages array.

    }
// statrt implemting SOCKET IO
    catch(error){
console.log(error );

    }
}