import express from "express";

import validateBody from "../helpers/validateBody.js";

import { authSignUpSchemas } from "../schemas/authSchemas.js";
import { registerUser, logIn } from "../controllers/authContollers.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSignUpSchemas), registerUser);

authRouter.post("/login", logIn);

export default authRouter;
