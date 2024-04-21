import { Router } from 'express';
import { 
    getUser,
    getUsers,
    getCurrentUser, 
    createUser, 
    updateUser 
} from '../controller/user.controller';
import { currentUser, requireAuth } from '@mirval/common';

const router = Router();

router.get('/api/user/:id', requireAuth, getUser);
router.get('/api/users', getUsers);
router.get('/api/current-user', currentUser, getCurrentUser);
router.post('/api/user', createUser);
router.put("/api/user/:id", updateUser);

export { router as userRouter };
