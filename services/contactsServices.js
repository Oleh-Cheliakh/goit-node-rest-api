import { User } from "../db/index.js";

async function listContacts() {
	const contactsData = await User.findAll();
	return contactsData;
}

async function getContactById(contactId) {
	const foundContact = await User.findByPk(contactId);

	return foundContact || null;
}

async function removeContact(contactId) {
	const deletedContact = await getContactById(contactId);

	if (!deletedContact) {
		return null;
	}

	await deletedContact.destroy();

	return deletedContact;
}

async function addContact(data) {
	const newContact = User.build(data);

	await newContact.save();

	return newContact;
}

async function renewContact(id, data) {
	const updatedContact = await User.update({ ...data }, { where: { id: id } });

	if (!updatedContact) {
		return null;
	}

	const targetContact = await getContactById(id);

	return targetContact;
}

async function updateStatusContact(id, data) {
	const favoriteContact = await User.update(
		{ favorite: data.favorite },
		{ where: { id: id } },
	);

	if (!favoriteContact) {
		return null;
	}

	const targetContact = await getContactById(id);

	return targetContact;
}

export {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	renewContact,
	updateStatusContact,
};
