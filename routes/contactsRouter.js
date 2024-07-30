import express from "express";
import {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
	favoriteContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
	createContactSchema,
	updateContactSchema,
	favoriteContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
	"/:id/favorite",
	validateBody(favoriteContactSchema),
	favoriteContact,
);

export default contactsRouter;
