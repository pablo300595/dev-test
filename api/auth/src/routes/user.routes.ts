import { Router } from 'express';
import { 
    getUser,
    getUsers,
    getCurrentUser, 
    createUser, 
    updateUser 
} from '../controller/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/api/user/:id', authMiddleware, getUser);
router.get('/api/users', authMiddleware, getUsers);
router.get('/api/current-user', authMiddleware, getCurrentUser);
router.post('/api/user', authMiddleware, createUser);
router.put("/api/user/:id", authMiddleware, updateUser);

export { router as userRouter };
