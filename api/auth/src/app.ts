import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { getAllRouter } from './routes/user.routes';
import { errorHandler, NotFoundError } from '@mirval/common';

const app = express();

app.set('trust proxy', true);
app.use(json());

app.use(getAllRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };