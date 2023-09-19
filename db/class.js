const mysql = require(`mysql2`);

const connection = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // MySQL password
  password: "SqlSqlSql231@!",
  database: "company",
});

class Queries {
  constructor(connection) {
    this.connection = connection;
  }

  getAllEmployees() {
    return this.connection.promise().query(`SELECT 
        e1.id as employee_id,
        e1.first_name AS first_name,
        e1.last_name AS last_name,
        d.name AS department,
        r.title AS title,
        r.salary,
        e2.first_name AS manager_first_name,
        e2.last_name AS manager_last_name
      FROM 
        employee e1
      JOIN 
        role r ON e1.role_id = r.id
      JOIN 
        department d ON r.department_id = d.id
      LEFT JOIN 
        employee e2 ON e1.manager_id = e2.id;`);
  }

  getAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department;");
  }

  getAllRoles() {
    return this.connection.promise()
      .query(`SELECT role.id,title,salary,department.name as department FROM role
    left join department
    on department.id = role.department_id
    `);
  }

  getAllManager() {
    return this.connection.promise()
      .query(`select employee.id, first_name, last_name, title
    from employee
    right join role
    on employee.role_id = role.id where role_id = 1`);
  }

  addRole(deptID, roleName, roleSal) {
    return this.connection
      .promise()
      .query(
        `insert into role(department_id,title,salary) values(${deptID},"${roleName}",${roleSal});`
      );
  }

  addDept(deptName) {
    return this.connection
      .promise()
      .query(`insert into department(name) values("${deptName}");`);
  }

  addEmp(first, last, role, manager) {
    return this.connection
      .promise()
      .query(
        `insert into employee(first_name,last_name,role_id,manager_id) values("${first}","${last}",${role},${manager});`
      );
  }

  updateRole(empid, newrol) {
    return this.connection
      .promise()
      .query(`update employee set role_id = ${newrol} where id = ${empid};`);
  }

  getSalary() {
    return this.connection.promise().query(`SELECT 
      d.name AS Department,
      SUM(r.salary) AS Budget_Used
  FROM 
      department d
  JOIN 
      role r ON d.id = r.department_id
  GROUP BY 
      d.name;`);
  }
}

module.exports = new Queries(connection);
