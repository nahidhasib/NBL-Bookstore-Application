const mysql = require('mysql2');

// Replace with your RDS instance details
const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || "awseb-e-8yisfmhhni-stack-awsebrdsdatabase-9wm74wpcbiiz.c12umuoyandg.eu-west-2.rds.amazonaws.com",
  user: process.env.RDS_USERNAME || "admin",
  password: process.env.RDS_PASSWORD || "adminpass1234",
  port: process.env.RDS_PORT || 3306,
  database: process.env.RDS_DB_NAME || "awseb-e-8yisfmhhni-stack-awsebrdsdatabase-9wm74wpcbiiz",
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
