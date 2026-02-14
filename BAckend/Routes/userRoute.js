
import express from "express";

import { register ,  login  , logout} from "../controller/controller.js";

const router = express.Router();

router.route("/register").post(register)
router.route("/Login").post(login)
router.route("/logout").get(logout)


export default router;
