import express from 'express';
import auth from '../middlewares/auth';
import controllers from '../controllers';

const { user } = controllers;

const app = express.Router();

app.post('/register', user.create);
app.post('/login', user.login);
app.get('/me', auth, user.me);

export default app;
