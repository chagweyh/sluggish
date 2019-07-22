#!/bin/bash

set -e

SERVER=ubuntu-server
APP_DIR=~/mini-slack-clone

set -x

npm run build
rsync -avzP build/ $SERVER:$APP_DIR
rsync -avzP package.json $SERVER:$APP_DIR
rsync -avzP package-lock.json $SERVER:$APP_DIR
ssh $SERVER "cd $APP_DIR && npm install"
ssh $SERVER "sudo pm2 restart server"
rm -rf build
