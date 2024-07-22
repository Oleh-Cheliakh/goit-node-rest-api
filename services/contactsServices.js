import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
	try {
		const contactsData = await fs.readFile(contactsPath);
		return JSON.parse(contactsData);
	} catch (error) {
		console.log(error);
	}
}

async function getContactById(contactId) {
	try {
		const contactsData = await listContacts();

		const foundContact = contactsData.find(
			(contact) => contact.id === contactId,
		);

		return foundContact || null;
	} catch (error) {
		console.log(error);
	}
}

async function removeContact(contactId) {
	try {
		const contactsData = await listContacts();
		const deletedContact = await getContactById(contactId);
		if (deletedContact) {
			const filteredContacts = contactsData.filter((contact) => {
				return contact.id !== deletedContact.id;
			});

			await fs.writeFile(
				contactsPath,
				JSON.stringify(filteredContacts, null, 2),
			);
		}
		return deletedContact;
	} catch (error) {
		console.log(error);
	}
}

async function addContact(name, email, phone) {
	try {
		const contactsData = await listContacts();
		const newContact = {
			id: crypto.randomBytes(16).toString("hex"),
			name,
			email,
			phone,
		};

		contactsData.push(newContact);

		await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));

		return newContact;
	} catch (error) {
		console.log(error);
	}
}

async function renewContact(id, data) {
	try {
		const contactsData = await listContacts();

		const index = contactsData.findIndex((contact) => contact.id === id);

		if (index === -1) {
			return null;
		}

		contactsData[index] = { ...contactsData[index], ...data };

		await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));

		return contactsData[index];
	} catch (error) {
		console.log(error);
	}
}

export {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	renewContact,
};
