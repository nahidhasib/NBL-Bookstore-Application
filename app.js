const express = require('express');
const db = require('./config/db');

// Set EJS as the templating engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true 

app.use(express.static('public'));

app.get('/', (req, res) => {
  const query = 'SELECT * FROM books';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).send('Error fetching books');
      return;
    }
    res.render('index', { books: results });
  });
});

// Route to show the form to add a new book
app.get('/add-book', (req, res) => {
  res.render('add-book');
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
  