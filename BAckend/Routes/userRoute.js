import express from "express";
import { getotherUsers, register, login, logout } from "../controller/controller.js";
import isAuthenticate from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticate, getotherUsers); // jha bhi yse hoga vha pe default with credentials ko true  karna hoga 
// due to authtenticated middleware 

export default router;