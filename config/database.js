const config = {
	username: "db_contacts_o5ev_user",
	password: "Vh68TXC7rhh4LiAJFIk9vLzBAhU9LktO",
	database: "db_contacts_o5ev",
	host: "dpg-cqj8u3ij1k6c739ou50g-a.frankfurt-postgres.render.com",
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			require: false, // Disable SSL/TLS
			rejectUnauthorized: false, // Disable certificate verification
		},
	},
};

export default config;
