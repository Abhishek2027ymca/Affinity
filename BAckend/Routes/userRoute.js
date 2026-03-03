import express from "express";
import { getotherUsers, register, login, logout } from "../controller/controller.js";
import isAuthenticate from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticate, getotherUsers);

export default router;