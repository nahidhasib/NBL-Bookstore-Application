const express = require('express');
const db = require('./config/db');
const app = express();
const port = process.env.PORT || 8080;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS, JS
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).send("Hello World!")
});

// Initialise the books table in the RDS
app.get('/create-table', (req, res) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255),
        category VARCHAR(50)
      );
    `;
    
    db.query(createTableQuery, (err, result) => {
      if (err) {
        console.error('Error creating table:', err);
        res.status(500).send('Error creating table');
        return;
      }
      res.send('Books table created successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  