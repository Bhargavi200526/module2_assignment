import express, { Request, Response, Router } from 'express';
import { users, User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

const router: Router = express.Router();

router.post('/register', (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful', user });
});

router.get('/user/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

export default router;
