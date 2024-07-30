import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	renewContact,
	updateStatusContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import { controllerWrapper } from "../decorator/controllerWrapper.js";

const getAllContacts = controllerWrapper(async (req, res) => {
	const contactsList = await listContacts();

	res.status(200).json(contactsList);
});

const getOneContact = controllerWrapper(async (req, res) => {
	const { id } = req.params;
	const foundedContact = await getContactById(id);

	if (!foundedContact) {
		throw HttpError(404);
	}
	res.status(200).json(foundedContact);
});

const deleteContact = controllerWrapper(async (req, res) => {
	const { id } = req.params;

	const removedContact = await removeContact(id);

	if (!removedContact) {
		throw HttpError(404);
	}
	res.status(200).json(removedContact);
});

const createContact = controllerWrapper(async (req, res) => {
	const addedContact = await addContact(req.body);

	res.status(201).json(addedContact);
});

const updateContact = controllerWrapper(async (req, res) => {
	if (Object.keys(req.body).length === 0) {
		throw HttpError(400, "Body must have at least one field");
	}

	const { id } = req.params;

	const updatedContact = await renewContact(id, req.body);

	if (!updatedContact) {
		throw HttpError(404);
	}

	res.status(200).json(updatedContact);
});

const favoriteContact = controllerWrapper(async (req, res) => {
	const { id } = req.params;

	const favoriteContact = await updateStatusContact(id, req.body);

	if (!favoriteContact) {
		throw HttpError(404);
	}

	res.status(200).json(favoriteContact);
});

export {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
	favoriteContact,
};
