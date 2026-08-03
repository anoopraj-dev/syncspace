import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { registerSchema } from "./auth.validataion.js";
import { signupController } from "./auth.controller.js";

const router = Router();

router.post ('/register', validate(registerSchema),signupController);


export default router;