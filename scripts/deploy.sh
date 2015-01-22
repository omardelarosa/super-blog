#!/bin/bash

ssh -A $AWS_HOST "\
cd /home/ubuntu/super-blog; \
git fetch --all; \
git reset --hard origin/master; \
npm install; \
forever restart /home/ubuntu/super-blog/index.js"