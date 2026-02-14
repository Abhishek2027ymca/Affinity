
import express from "express";

import { register ,  login } from "../controller/controller.js";

const router = express.Router();

router.route("/register").post(register)
router.route("/Login").post(login)

export default router;
