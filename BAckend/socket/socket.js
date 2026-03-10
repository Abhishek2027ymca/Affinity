// socke is a leyer in server 
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();// creatign a server 

const server = http.createServer(app); //server mein app pass kia ,
// socket ka server is at he top of the  exprees serve r
const io = new Server(server, {

    

    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
})



io.on('connection', (socket) => {
    console.log('✅ User connected', socket.id);




})

export { app, io, server } 