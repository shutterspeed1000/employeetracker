const quest = require("inquirer");
const ui = new quest.ui.BottomBar();
require("console.table");

// added class file
const db = require("./db/class");

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

const empq = [

  
];

const roleq = [

  {
    type: "input",
    message: "What department will this roll be in(enter number)?",
    name: "deptID",
  },
  {
    type: "input",
    message: "Enter new role name:",
    name: "roleName",
    validate: (value) => {
      if (value.length < 1) {
        return `You must enter a role name.`;
    }
    return true
  },
},
  {
    type: "input",
    message: "Enter new role salary:",
    name: "roleSal",
    validate: (value) => {
      if (value.length < 1) {
        return `You must enter an amount.`;
    }
    return true
  },
}
];

const deptq = [


  {
    type: "input",
    message: "Enter new department name:",
    name: "deptname",
    validate: (value) => {
      if (value.length < 1) {
        return `You must enter a department name.`;
    }
    return true
  }
}

];

// Function to ask questions for main site
const askqs = async () => {
  const answers = await quest.prompt(mainq);

  switch (answers.mainq) {
    case "View all employees":
      let lookup = "db.getAllEmployees()";
      datalookup(lookup);
      break;
    case "View all departments":
      datalookup();
      break;
    case "View all roles":
      break;
    case "Add a department":
      break;
    case "Add a role":
      addRoleq();
      break;
    case "Add an employee":
      break;
    case "Update an employee role":
      break;
  }
};

async function datalookup(dothis) {
  try {
    const [data] = await dothis;
    console.table(data);
    askqs();
  } catch (error) {
    console.error(error);
  }
}

async function addRoleq() {
  try {
    const [dept] = await db.getAllDepartments()
    console.table(dept);
    const answers = await quest.prompt(roleq);
    const writedb = await db.addRole(answers.deptID,answers.roleName,answers.roleSal);
    console.log("Role added to system");
    askqs();
  } catch (error) {
    console.error(error);
  }
}

askqs();
