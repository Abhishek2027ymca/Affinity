
import express from "express";

import {register} from" ../controller/controller.js"

const router = express.Router();

router.route("/register").post(register)

export default router;
