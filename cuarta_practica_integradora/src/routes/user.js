import { Router } from "express";
import auth from "../middleware/auth.js";
import UserController from "../controllers/user.js";

const router = Router();

const userController = new UserController();

router.get('/', auth("session"), userController.getUsers)
router.get('/delete', auth("session"), userController.deleteUsers)
router.get("/premium/:uid", auth("session"), userController.changeRoleUser);

export default router;