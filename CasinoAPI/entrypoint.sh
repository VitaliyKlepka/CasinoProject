#!/bin/sh
# Run database migrations before starting the app
npm run migrate
echo "[APP_LOG]::Migrations completed"
echo "[APP_LOG]::Starting the app"
ls -la /usr/src/app

npm run start:prod