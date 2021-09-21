! /bin/sh

git pull && \
mkdir -p $HOME/.jomigu && touch $HOME/.jomigu/build-start && date > $HOME/.jomigu/build-start && \
npm run generate && \
echo "Rebuild complete!" && \
npm run deploy && \
mkdir -p $HOME/.jomigu && touch $HOME/.jomigu/build-end && date > $HOME/.jomigu/build-end && \
echo "Deployed!"
