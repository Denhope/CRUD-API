import express, { Request, Response } from 'express';
import { v4 as uuidv4, validate } from 'uuid';
import { User } from '../models/user.model';

const router = express.Router();

let users: User[] = [];

// GET /api/users
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(users);
});

// GET /api/users/:userId
router.get('/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = users.find(user => user.id === userId);

  if (!validate(userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});

// POST /api/users
router.post('/', (req: Request, res: Response) => {
  const { username, age, hobbies } = req.body;

  if (!username || !age || !hobbies) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:userId
router.put('/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userIndex = users.findIndex(user => user.id === userId);

  if (!validate(userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { username, age, hobbies } = req.body;

  const updatedUser: User = {
    id: userId,
    username: username || users[userIndex].username,
    age: age || users[userIndex].age,
    hobbies: hobbies || users[userIndex].hobbies,
  };

  users[userIndex] = updatedUser;
  res.status(200).json(updatedUser);
});

// DELETE /api/users/:userId
router.delete('/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userIndex = users.findIndex(user => user.id === userId);

  if (!validate(userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

export default router;
