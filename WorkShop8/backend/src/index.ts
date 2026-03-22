import express from 'express';
import { prisma } from '../lib/prisma';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.post('/api/books', async (req, res) => {
    const { title, author, description, price } = req.body;
    try {
        const book = await prisma.book.create({
            data: {
                title,
                author,
                description,
                price,
            },
        });
        res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create book' });
    }
});

app.get('/api/books', async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        if (books.length === 0) {
            return res.json([]);
        }
        else {
            res.json(books);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

// get book by id
app.get('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await prisma.book.findUnique({
            where: { bookID : id },
        });
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch book' });
    }
});

// update book by id
app.put('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, description, price } = req.body;
    try {
        const book = await prisma.book.update({
            where: { bookID : id },
            data: {
                title,
                author,
                description,
                price,
            },
        });
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update book' });
    }
});

// delete book by id
app.delete('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.book.delete({
            where: { bookID : id },
        });
        res.status(204).send();
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Book not found' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete book' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});