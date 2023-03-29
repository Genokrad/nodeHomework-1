const contactActions = require("./contacts");
const { program } = require("commander");

contactActions.listContacts();
async function getAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContacts = await contactActions.listContacts();
      console.table(listContacts);
      break;
    case "get":
      contactActions.getContactById(id);
      break;
    case "add":
      contactActions.addContact(name, email, phone);
      break;
    case "remove":
      contactActions.removeContact(id);

      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
// console.log(program);

getAction(options);
