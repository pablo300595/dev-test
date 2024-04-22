import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import CookieSession = require("cookie-session");

import { userRouter } from './routes/user.routes';
import { authRouter } from './routes/auth.routes';
import { errorHandler, NotFoundError } from '@mirval/common';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
    CookieSession({
        signed: false,
        secure: process.env['NODE_ENV'] !== 'test'
    })
);

app.use(userRouter);
app.use(authRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };