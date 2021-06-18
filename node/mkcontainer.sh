#!/bin/bash
VERSION=$(cat VERSION)
COIN_TICKER='btc'
COIN_DIR='btccoin'
NODE_RPC_PORT=30500

docker run -dit \
           -v ${COIN_TICKER}_data:/wallets/${COIN_DIR}/data \
           -v $(pwd)/bitcoin.conf:/wallets/${COIN_DIR}/data/bitcoin.conf \
           -p ${NODE_RPC_PORT}:30000 \
           --env-file $(pwd)/env \
           --name ${COIN_TICKER}-${VERSION} \
           --restart always \
           node/${COIN_TICKER}:${VERSION}
