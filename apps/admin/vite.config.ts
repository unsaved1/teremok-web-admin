import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import {tanstackRouter} from '@tanstack/router-plugin/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [
            tanstackRouter({
                target: 'react',
                autoCodeSplitting: true,
                routesDirectory: './src/presentation/routes',
            }),
            react(),
            svgr({
                include: '**/*.svg?react',
            }),
        ],
        build: {
            rolldownOptions: {
                output: {
                    codeSplitting: {
                        groups: [
                            {
                                name: 'rhc-vendor',
                                test: /node_modules[\\/]@hookform/,
                                priority: 25,
                            },
                            {
                                name: 'react-vendor',
                                test: /node_modules[\\/]react/,
                                priority: 20,
                            },
                            {
                                name: 'tanstack-vendor',
                                test: /node_modules[\\/]@tanstack/,
                                priority: 19,
                            },
                            {
                                name: 'tanstack-query-vendor',
                                test: /node_modules[\\/]tanstack-query/,
                                priority: 19,
                            },
                            {
                                name: 'axios-vendor',
                                test: /node_modules[\\/]axios/,
                                priority: 18,
                            },
                            {
                                name: 'zustand-vendor',
                                test: /node_modules[\\/]zustand/,
                                priority: 16,
                            },
                            {
                                name: 'emotion-vendor',
                                test: /node_modules[\\/]@emotion/,
                                priority: 16,
                            },
                            {
                                name: 'chakra-ui-vendor',
                                test: /node_modules[\\/]@chakra-ui/,
                                priority: 15,
                            },
                            {
                                name: 'zod-vendor',
                                test: /node_modules[\\/]zod/,
                                priority: 12,
                            },
                            {
                                name: 'vendor',
                                test: /node_modules/,
                                priority: 10,
                            },
                        ],
                    },
                },
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@root': path.resolve(__dirname, './'),
            },
        },
        server: {
            host: '0.0.0.0',
            port: 5173,
        },
        preview: {
            port: parseInt(env.VITE_APP_PROD_PORT),
            allowedHosts: ['teremok-admin.unsaved11testing.ru'],
        },
    };
});
