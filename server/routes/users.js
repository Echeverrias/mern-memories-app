import express from 'express';
//import { signIn, signUp } from '../controllers/users.js';
//import * as auth from '../controllers/users.js';
import { signUp, signIn } from '../controllers/users.js';



const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);

export default router;