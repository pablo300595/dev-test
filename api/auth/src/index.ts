import { app } from './app';
import { createConnection } from "./db";
import { setup } from './setup';

createConnection();
setup();

const start = async(): Promise<void> => {
    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
}

start();
