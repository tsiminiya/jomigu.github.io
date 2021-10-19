#! /bin/sh

sh ./push.sh && \
npm run generate && \
npm run deploy

echo "Deployed!"
