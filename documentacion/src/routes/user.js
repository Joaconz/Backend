import { Router } from "express";
import auth from "../middleware/auth.js";
import UserController from "../controllers/user.js";

const router = Router();

const userController = new UserController();

router.get("/premium/:uid", auth("session"), userController.changeRoleUser);

export default router;