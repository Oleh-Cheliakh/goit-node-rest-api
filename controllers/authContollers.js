import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { controllerWrapper } from "../decorator/controllerWrapper.js";

import { signUp, findUser } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

const registerUser = controllerWrapper(async (req, res) => {
	const newUser = await signUp(req.body);

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
});

const logIn = controllerWrapper(async (req, res) => {
	const { email, password } = req.body;

	const user = await findUser({ email });

	const comparePassword = await bcrypt.compare(password, user.password);

	if (!user || !comparePassword) {
		throw HttpError(401, "Email or password is wrong");
	}

	const { JWT_SECRET } = process.env;

	const payload = {
		id: user.id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

	res.json({
		token,
	});
});

export { registerUser, logIn };
