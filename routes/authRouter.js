import express from "express";

import validateBody from "../helpers/validateBody";

import { authSignUpSchemas } from "../schemas/authSchemas";
import { signUp } from "../controllers/authContollers";

const authRouter = express.Router();

authRouter.post("/auth/register", validateBody(authSignUpSchemas), signUp);
