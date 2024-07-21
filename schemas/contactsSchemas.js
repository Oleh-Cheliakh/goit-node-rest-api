import Joi from "joi";

export const createContactSchema = Joi.object({
	name: Joi.string().alphanum().required(),
	email: Joi.string().email().required(),
	phone: Joi.number().required(),
});

export const updateContactSchema = Joi.object({
	name: Joi.string().alphanum(),
	email: Joi.string().email(),
	phone: Joi.number(),
});
