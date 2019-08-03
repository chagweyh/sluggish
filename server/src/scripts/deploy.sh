#!/bin/bash

set -e

SERVER=ubuntu-server
APP_DIR=~/sluggish

set -x

yarn build
rsync -avzP build/ $SERVER:$APP_DIR
rsync -avzP package.json $SERVER:$APP_DIR
rsync -avzP yarn.lock $SERVER:$APP_DIR
ssh $SERVER "cd $APP_DIR && yarn install"
ssh $SERVER "sudo pm2 restart server"
rm -rf build
