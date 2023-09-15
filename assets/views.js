const mysql = require("mysql2");


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'SqlSqlSql231@!',
      database: 'company'
    },
    console.log(`Connected to the classlist_db database.`)
  );


  // Query to show all employee information

  const emplookup = () => {db.query(`
  SELECT 
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
    employee e2 ON e1.manager_id = e2.id;
  
  `, function (err, results) {
    return console.table(results);
  });

  }




// query departments

const departlookup = () => {

    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
      });

}



// Query Roles
const rolelookup = () => {

    db.query('SELECT * FROM department', function (err, results) {
        return console.table(results);
      });

}

module.exports = { emplookup, rolelookup, departlookup }

