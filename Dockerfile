FROM ubuntu:20.04

RUN apt update && apt install -y git && apt install -y curl && \
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash && \
    source ~/.profile && \
    nvm install node
