const db = require("mysql2");
const quest = require("inquirer");
const ui = new quest.ui.BottomBar();
const { rolelookup, emplookup, departlookup } = require("./assets/views");
console.log("Welcome to the Employee Tracker v1.0.0");

const mainq = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
    name: "mainq",
  },
];

const askqs = async () => {
  const answers = await quest.prompt(mainq);

  switch (answers.mainq) {
    case "View all employees":

    const emptable = new Promise((resolve, reject) => {
       console.table(emplookup())
      resolve();
    });
    
    break;
    case "View all departments":
      departlookup();
      break;
  }
  askqs();
};

askqs();
