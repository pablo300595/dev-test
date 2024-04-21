import { Router } from 'express';
import { signIn } from '../controller/auth.controller';
import { body } from 'express-validator';
import { validateRequest } from '@mirval/common';

const router = Router();

router.post('/api/login', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password'),
    validateRequest
], signIn);

export { router as authRouter };