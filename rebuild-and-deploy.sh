! /bin/sh

git pull && \
npm run generate && \

echo "Rebuild complete!"

npm run deploy

mkdir -p $HOME/.jomigu && touch $HOME/.jomigu/build && date > $HOME/.jomigu/build

echo "Deployed!"
