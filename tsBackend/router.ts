import express from 'express';
import { signUp } from './src/controllers/user';
import { getUser } from './src/controllers/getUser';
import { login } from './src/controllers/login';
import { getChats } from './src/controllers/getChats';
const Router = express.Router();

Router.post('/signUp', signUp);
Router.get('/allUsers', getUser);
Router.post('/login', login);
Router.get('/getChats', getChats);

export default Router;