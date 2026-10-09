/**
 * PM2 process file — We Are Music
 * Backend : http://localhost:4000
 * Frontend: http://localhost:5173
 *
 * Usage (from repo root):
 *   npm run pm2:start
 *   npm run pm2:logs
 *   npm run pm2:stop
 */
module.exports = {
  apps: [
    {
      name: 'wearemusic-api',
      cwd: './server',
      script: 'src/index.js',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'development',
        PORT: 4000,
        CORS_ORIGIN: 'http://localhost:5173',
      },
    },
    {
      name: 'wearemusic-web',
      cwd: './web',
      script: 'node_modules/vite/bin/vite.js',
      args: '--host --port 5173',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
