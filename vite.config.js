import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                admi: resolve(__dirname, 'src/views/admi.html'),
                contacta: resolve(__dirname, 'src/views/contacta.html'),
                booking: resolve(__dirname, 'src/views/booking.html'),
                create: resolve(__dirname, 'src/views/create.html'),
                edit: resolve(__dirname, 'src/views/edit.html'),
                explora: resolve(__dirname, 'src/views/explora.html'),
            },
        },
    },
});
