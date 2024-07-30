import { Sequelize, DataTypes } from "sequelize";
import config from "./../config/database.js";

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		dialect: config.dialect,
		dialectOptions: config.dialectOptions,
	},
);

const User = sequelize.define(
	"contact",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		favorite: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		timestamps: false,
	},
);

async function connectDB() {
	try {
		await sequelize.authenticate();
		await User.sync();
		console.log("Database connection successful");
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}

export { sequelize, connectDB, User };
