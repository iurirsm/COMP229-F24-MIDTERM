/**
 * Midterm API Project - COMP229 Winter 2024
 * 
 * Challenge: Implement the API logic for managing a collection of books!
 * 
 * Here's the deal:
 * You have a server running on port 8080, and an array of books.
 * Your mission, should you choose to accept it, is to implement the missing logic
 * for each of the following API endpoints. 
 * 
 * Endpoints:
 * 1. GET /api/items       - Retrieve the full list of books.
 * 2. GET /api/items/search?title=[partial title name] - Retrieve books by a partial title match.
 * 3. GET /api/items/:id   - Retrieve a book by its index.
 * 4. POST /api/items      - Add a new book to the collection.
 * 5. PUT /api/items/:id   - Update a book by its index.
 * 6. DELETE /api/items/:id - Remove a book from the collection by its index.
 * 
 * The array of books is already defined for you, but you need to bring the logic
 * to life. Test your work using tools like Postman or Thunder Client.
 * 
 * Submission Requirements:
 * 1. **Screenshots**: Provide screenshots of your API tests, clearly showing:
 *    - There should be 1 screenshot per Endpoint (6 in total)
 *    - The API request.
 *    - The request body (where applicable).
 *    - The successful response.
 *    Use Postman, Thunder Client, or another similar API testing tool.
 * 
 * 2. **Code Submission**: 
 *    - Include your code in a **.zip** file.
 *    - Provide a GitHub link to your repository containing the project.
 *    - Make sure all screenshots are clearly visible in your submission.
 * 
 * Good luck, and may your code be bug-free!
 */

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of strings (books)
let books = ['The Hobbit', '1984', 'To Kill a Mockingbird', 'Moby Dick', 'Pride and Prejudice'];

// Set the port for the server
const PORT = 8080;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// API Endpoints

// GET /api/items
// Description: Get all items (books)
app.get('/api/items', (req, res) => {
  res.json(books);
});

// GET /api/items?title=[<<partial title name>>]
// Description: Search for books by partial title match
app.get('/api/items/search', (req, res) => {
  const partialTitle = req.query.title;
  if (!partialTitle) {
    return res.status(400).send('Title query parameter is required.');
  }
  const matchedBooks = books.filter((book) =>
    book.toLowerCase().includes(partialTitle.toLowerCase())
  );
  res.json(matchedBooks);
});

// GET /api/items/:id
// Description: Get a specific item by ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < books.length) {
    res.send(books[id]);
  } else {
    res.status(404).send('Book not found.');
  }
});

// POST /api/items
// Description: Add a new item
app.post('/api/items', (req, res) => {
  const newTitle = req.body.title;
  if (!newTitle) {
    return res.status(400).send('Book title is required.');
  }
  books.push(newTitle);
  res.status(201).send('Book added successfully.');
});

// PUT /api/items/:id
// Description: Update an item by ID
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newTitle = req.body.title;
  if (id >= 0 && id < books.length) {
    if (!newTitle) {
      return res.status(400).send('New book title is required.');
    }
    books[id] = newTitle;
    res.send('Book updated successfully.');
  } else {
    res.status(404).send('Book not found.');
  }
});

// DELETE /api/items/:id
// Description: Remove an item by ID
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < books.length) {
    books.splice(id, 1);
    res.send('Book deleted successfully.');
  } else {
    res.status(404).send('Book not found.');
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
