import bcrypt from "bcrypt";
import UserData from "../db/models/User.js";

const signUp = async (data) => {
	try {
		const { password } = data;
		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = await UserData.create({ ...data, password: hashPassword });
		return newUser;
	} catch (error) {
		if (error?.parent?.code === "23505") {
			error.message = "Email in use";
		}
		throw error;
	}
};

const findUser = (query) =>
	UserData.findOne({
		where: query,
	});

export { signUp, findUser };
