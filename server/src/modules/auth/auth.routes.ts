import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { registerSchema } from "./auth.validataion.js";
import { signup } from "./auth.controller.js";

const router = Router();

router.post ('/signup', validate(registerSchema),signup);


export default router;