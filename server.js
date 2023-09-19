const quest = require("inquirer");
require("console.table");

// added class file
const db = require("./db/class");

console.log("Employee Tracker 1986");

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
      "Quit",
    ],
    name: "mainq",
  },
];

const emprol = [
  {
    type: "input",
    message: "Enter ID of employee to update:",
    name: "emproleid",
    validate: (value) => {
      if (value.length < 1) {
        return `You must an ID.`;
      }
      return true;
    },
  },
];

const emprol2 = [
  {
    type: "input",
    message: "Select ID to change Employee to:",
    name: "empnewrol",
    validate: (value) => {
      if (value.length < 1) {
        return `You must an ID.`;
      }
      return true;
    },
  },
];

const empq = [
  {
    type: "input",
    message: "Enter Employee 1st name:",
    name: "empfname",
    validate: (value) => {
      if (value.length < 1) {
        return `You must enter name.`;
      }
      return true;
    },
  },
  {
    type: "input",
    message: "Enter Employee last name:",
    name: "emplname",
    validate: (value) => {
      if (value.length < 1) {
        return `You must enter a last name.`;
      }
      return true;
    },
  },
];
const empq2 = [
  {
    type: "number",
    message: "Enter the role of the employee(select number):",
    name: "emprole",
    validate: (value) => {
      if (value.length < 1) {
        return `You must enter a role.`;
      }
      return true;
    },
  },
];
const empq3 = [
  {
    type: "number",
    message: "Enter the manager of the employee(select number):",
    name: "empman",
    validate: (value) => {
      if (value.length < 1) {
        return `You must enter a manager.`;
      }
      return true;
    },
  },
];

const roleq = [
  {
    type: "number",
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
      return true;
    },
  },
  {
    type: "number",
    message: "Enter new role salary:",
    name: "roleSal",
    validate: (value) => {
      if (value.length < 1) {
        return `You must enter an amount.`;
      }
      return true;
    },
  },
];

const deptq = [
  {
    type: "input",
    message: "Enter new department name:",
    name: "deptName",
    validate: (value) => {
      if (value.length < 1) {
        return `You must enter a department name.`;
      }
      return true;
    },
  },
];

// Function to ask questions for main site
const askqs = async () => {
  const answers = await quest.prompt(mainq);

  switch (answers.mainq) {
    case "View all employees":
      viewEmp();
      break;
    case "View all departments":
      viewDept();
      break;
    case "View all roles":
      viewRoles();
      break;
    case "Add a department":
      addDeptq();
      break;
    case "Add a role":
      addRoleq();
      break;
    case "Add an employee":
      addEmpq();
      break;
    case "Update an employee role":
      upEmRoleq();
      break;
    case "Quit":
      process.exit();
      break;
  }
};

async function viewEmp() {
  try {
    const [data] = await db.getAllEmployees();
    console.table(data);
    askqs();
  } catch (error) {
    console.error(error);
  }
}

async function viewDept() {
  try {
    const [data] = await db.getAllDepartments();
    console.table(data);
    askqs();
  } catch (error) {
    console.error(error);
  }
}

async function viewRoles() {
  try {
    const [data] = await db.getAllRoles();
    console.table(data);
    askqs();
  } catch (error) {
    console.error(error);
  }
}

async function addRoleq() {
  try {
    const [dept] = await db.getAllDepartments();
    console.table(dept);
    const answers = await quest.prompt(roleq);
    const writedb = await db.addRole(
      answers.deptID,
      answers.roleName,
      answers.roleSal
    );
    console.log("**********Role added to system************");
    askqs();
  } catch (error) {
    console.error(error);
  }
}

async function addDeptq() {
  try {
    const answers = await quest.prompt(deptq);
    const writedb = await db.addDept(answers.deptName);
    console.log("**********Department added to system************");
    askqs();
  } catch (error) {
    console.error(error);
  }
}

async function addEmpq() {
  try {
    const empa = await quest.prompt(empq);
    const [data1] = await db.getAllRoles();
    console.table(data1);
    const empa2 = await quest.prompt(empq2);
    const [data2] = await db.getAllManager();
    console.table(data2);
    const empa3 = await quest.prompt(empq3);
    const writedb = await db.addEmp(
      empa.empfname,
      empa.emplname,
      empa2.emprole,
      empa3.empman
    );
    console.log("**********Employee added to system************");
    askqs();
  } catch (error) {
    console.error(error);
  }
}

async function upEmRoleq() {
  try {
    const [emp] = await db.getAllEmployees();
    console.table(emp);
    const emprold1 = await quest.prompt(emprol);
    const [role] = await db.getAllRoles();
    console.table(role);
    const emprold2 = await quest.prompt(emprol2);
    const writeRole = await db.updateRole(emprold1.emproleid,emprold2.empnewrol);
    console.log("**********Role updated************");
    askqs();
  } catch (error) {
    console.error(error);
  }
}

askqs();
