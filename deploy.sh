#! /bin/sh

git push && \
npm run generate && \
npm run deploy

echo "Deployed!"
