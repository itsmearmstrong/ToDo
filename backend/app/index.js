import express from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserIdFromToken } from "./middleware/auth-user.js";
import cors from 'cors';


const app = express();
app.use(cors({origin: 'https://todo-rose-nu.vercel.app/', // Adjust this to your frontend URL
credentials: true})); // Allow credentials for cookies, authorization headers, etc. 
const prisma = new PrismaClient();

app.use(express.json());

const JWT_SECRET = 'your_secret_key'; 

app.get('/profile', getUserIdFromToken, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // salt rounds = 10

        // Create user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        // Issue token
        const token = jwt.sign(
            { userId: newUser.id},
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//todo routes

app.post('/create-todo', getUserIdFromToken, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        userId
      }
    });

    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong while creating the todo' });
  }
});

app.get('/get-todos', getUserIdFromToken, async (req, res) => {
  const userId = req.userId;

  try {
    const todos = await prisma.todo.findMany({
      where: { userId }
    });

    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.delete('/todos/:id', getUserIdFromToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    // Check if todo belongs to user
    const todo = await prisma.todo.findFirst({
      where: { id: parseInt(id), userId }
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await prisma.todo.delete({
      where: { id: todo.id }
    });

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});


app.put('/todos/:id', getUserIdFromToken, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    // Check if todo belongs to user
    const todo = await prisma.todo.findFirst({
      where: { id: parseInt(id), userId }
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todo.id },
      data: {
        title: title || todo.title,
        description: description || todo.description
      }
    });

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.listen(8080, () => console.log('Server running on port 8080'));
