import { ValidationError } from "sequelize";
import HttpError from "../helpers/HttpError.js";

export const controllerWrapper = (controller) => {
	return async (req, res, next) => {
		try {
			await controller(req, res, next);
		} catch (error) {
			if (error instanceof ValidationError) {
				return next(HttpError(400, error.message));
			}
			next(error);
		}
	};
};
