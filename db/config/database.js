const {
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	DATABASE_NAME,
	DATABASE_HOST,
	DATABASE_DIALECT,
	DATABASE_PORT,
} = process.env;

const config = {
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME,
	host: DATABASE_HOST,
	dialect: DATABASE_DIALECT,
	port: DATABASE_PORT,
	dialectOptions: {
		ssl: true,
	},
};

export default config;
