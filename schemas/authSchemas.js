import Joi from "joi";
import { emailPatterValidation } from "../constants/authConstants.js";

const authSignUpSchemas = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().pattern(emailPatterValidation).required(),
});

export { authSignUpSchemas };
