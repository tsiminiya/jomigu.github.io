#! /bin/sh

git pull && \
npm run generate && \

echo "Rebuild complete!"

npm run deploy
echo "Deployed!"
