#!/bin/sh
sudo git pull origin main
sudo yarn install
sudo yarn run build
sudo pm2 restart all