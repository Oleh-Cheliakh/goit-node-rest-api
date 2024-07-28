import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
	const contactsData = await fs.readFile(contactsPath);
	return JSON.parse(contactsData);
}

async function getContactById(contactId) {
	const contactsData = await listContacts();

	const foundContact = contactsData.find((contact) => contact.id === contactId);

	return foundContact || null;
}

async function removeContact(contactId) {
	const contactsData = await listContacts();
	const deletedContact = await getContactById(contactId);
	if (deletedContact) {
		const filteredContacts = contactsData.filter((contact) => {
			return contact.id !== deletedContact.id;
		});

		await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
	}
	return deletedContact;
}

async function addContact(data) {
	const contactsData = await listContacts();
	const newContact = {
		id: crypto.randomBytes(16).toString("hex"),
		...data,
	};

	contactsData.push(newContact);

	await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));

	return newContact;
}

async function renewContact(id, data) {
	const contactsData = await listContacts();

	const index = contactsData.findIndex((contact) => contact.id === id);

	if (index === -1) {
		return null;
	}

	contactsData[index] = { ...contactsData[index], ...data };

	await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));

	return contactsData[index];
}

export {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	renewContact,
};
