import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

import * as contactService from "./contacts.js";

const options = program.opts();

// TODO: рефакторити
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContacts = await contactService.listContacts();
      return console.table(listContacts);
    case "get":
      const getContactById = await contactService.getContactById(id);
      return console.log(getContactById);
    case "add":
      const newContact = await contactService.addContact(name, email, phone);
      return console.log(newContact);
    case "remove":
      const removeContact = await contactService.removeContact(id);
      return console.log(removeContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(options);
