import express from "express";
import { sendMessage } from "../controller/messageController.js"; /// always write .js  along with file name 

const router = express.Router();

router.route("/send/:id").post(sendMessage);

export default router ;