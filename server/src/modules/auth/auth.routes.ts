import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validataion.js";
import { getCurrentUser, login, signup } from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post ('/signup', validate(registerSchema),signup);
router.get('/me',authenticate,getCurrentUser);
router.post('/login',validate(loginSchema), login)



export default router;