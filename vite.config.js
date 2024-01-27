import { defineConfig } from 'vite';

export default defineConfig({
    root: './frontend',
    server: {
        proxy: {
            '/getTransactionData': 'http://localhost:3000'
        }
    }
});
