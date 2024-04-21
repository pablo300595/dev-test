import {Router } from 'express';
import { 
    getUser,
    getUsers, 
    createUser, 
    updateUser 
} from '../controller/user.controller';

const router = Router();

router.get('/api/user/:id', getUser);
router.get('/api/users', getUsers);
router.post('/api/user', createUser);
router.put("/tasks/:id", updateUser);

export { router as getAllRouter };
