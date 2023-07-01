import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';

(async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log('Database Connected');

        app.on('error', (error) => {
            console.error('Error: ', error);
            throw error;
        });

        const onListening = () => {
            console.log(`Server is running on port ${config.port}`);
        }

        app.listen(config.port, onListening);
    } catch (error) {
        console.error('Error: ', error);
        throw error;        
    }
})();