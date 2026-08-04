import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validataion.js";
import { getCurrentUserController, loginController, logoutAllController, logoutController, rotateToken, signupController } from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post ('/signup', validate(registerSchema),signupController);
router.get('/me',authenticate,getCurrentUserController);
router.post('/login',validate(loginSchema), loginController);
router.post('/refresh',rotateToken);
router.post('/logout',logoutController);
router.post('/logout-all', authenticate,logoutAllController)



export default router;