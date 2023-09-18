const mysql = require(`mysql2`);


const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'SqlSqlSql231@!',
      database: 'company'
    },
  );

  class Queries{
    constructor(connection){
        this.connection =  connection
    }

    getAllEmployees(){
        return this.connection.promise().query(`SELECT 
        e1.first_name AS first_name,
        e1.last_name AS last_name,
        d.name AS department,
        r.title AS role,
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
        employee e2 ON e1.manager_id = e2.id;`)
    }

    getAllDepartments(){
      return this.connection.promise().query('SELECT * FROM department;')
    }

    getAllRoles(){
      return this.connection.promise().query('SELECT * FROM role;')
    }
    
    addRole(deptID,roleName,roleSal){
      return this.connection.promise().query(`insert into role(department_id,title,salary) values(${deptID},"${roleName}",${roleSal});`)
    }

  }

  module.exports = new Queries(connection)

