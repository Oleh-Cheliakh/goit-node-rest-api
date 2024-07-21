import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	renewContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

import validateBody from "../helpers/validateBody.js";

import {
	createContactSchema,
	updateContactSchema,
} from "../schemas/contactsSchemas.js";

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
	res.json(HttpError(404));
};

export const deleteContact = async (req, res) => {
	const { id } = req.params;

	const removedContact = await removeContact(id);

	if (removedContact) {
		return res.status(200).json(removedContact);
	}
	res.json(HttpError(404));
};

export const createContact = async (req, res) => {
	try {
		const { name, email, phone } = req.body;
		console.log(req.body);
		validateBody(createContactSchema);

		const addedContact = await addContact(name, email, phone);

		res.status(201).json(addedContact);
	} catch (error) {
		res.json(HttpError(400, error.message));
	}
};

export const updateContact = async (req, res) => {
	try {
		if (Object.keys(req.body).length === 0) {
			return res.json(HttpError(400, "Body must have at least one field"));
		}

		const { id } = req.params;
		const { name, email, phone } = req.body;

		validateBody(updateContactSchema);

		const updatedContact = await renewContact(id, name, email, phone);

		console.log(updatedContact);

		if (updatedContact) {
			return res.status(200).json(updatedContact);
		}

		res.json(HttpError(404));
	} catch (error) {
		res.json(HttpError(400, error.message));
	}
};
