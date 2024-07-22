import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	renewContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
	const contactsList = await listContacts();

	res.status(200).json(contactsList);
};

export const getOneContact = async (req, res) => {
	const { id } = req.params;
	const foundedContact = await getContactById(id);

	if (foundedContact) {
		return res.status(200).json(foundedContact);
	}
	const { status, message } = HttpError(404);
	res.status(status).json({ message });
};

export const deleteContact = async (req, res) => {
	const { id } = req.params;

	const removedContact = await removeContact(id);

	if (removedContact) {
		return res.status(200).json(removedContact);
	}
	const { status, message } = HttpError(404);
	res.status(status).json({ message });
};

export const createContact = async (req, res) => {
	try {
		const { name, email, phone } = req.body;

		const addedContact = await addContact(name, email, phone);

		res.status(201).json(addedContact);
	} catch (error) {
		const { status, message } = HttpError(400, error.message);
		res.status(status).json({ message });
	}
};

export const updateContact = async (req, res) => {
	try {
		if (Object.keys(req.body).length === 0) {
			const { status, message } = HttpError(
				400,
				"Body must have at least one field",
			);
			return res.status(status).json({ message });
		}

		const { id } = req.params;

		const updatedContact = await renewContact(id, req.body);

		if (updatedContact) {
			return res.status(200).json(updatedContact);
		}

		const { status, message } = HttpError(404);

		res.status(status).json({ message });
	} catch (error) {
		const { status, message } = HttpError(400, error.message);
		res.status(status).json({ status, message });
	}
};
