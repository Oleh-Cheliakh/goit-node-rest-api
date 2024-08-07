import Joi from "joi";
import { emailPatterValidation } from "../constants/authConstants";

const authSignUpSchemas = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailPatterValidation).required(),
});

export { authSignUpSchemas };
