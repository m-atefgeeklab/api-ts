import express, { Request, Response } from 'express';
import Book from '../models/book.model';

const router = express.Router();

// Create a new book
router.post('/books', async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all books
router.get('/books', async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single book by ID
router.get('/books/:id', async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a book by ID
router.patch('/books/:id', async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a book by ID
router.delete('/books/:id', async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
