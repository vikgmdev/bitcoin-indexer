FROM ubuntu:20.04 as builder

ARG GIT_REVISION
WORKDIR /usr/src

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        g++=4:9.3.0-1ubuntu2 \
        git=1:2.25.1-1ubuntu3 \
        libboost1.71-all-dev=1.71.0-6ubuntu6 \
        libdb++-dev=1:5.3.21~exp1ubuntu2 \
        libdb-dev=1:5.3.21~exp1ubuntu2 \
        libminiupnpc-dev=2.1.20190824-0ubuntu2 \
        libssl1.1=1.1.1f-1ubuntu2 \
        libssl-dev=1.1.1f-1ubuntu2 \
        libzmq3-dev=4.3.2-2ubuntu1 \
        make=4.2.1-1.2 \
        pkg-config=0.29.1-0ubuntu4

RUN git clone https://github.com/bitcoin/bitcoin.git && \
        cd bitcoin && \
        git checkout ${GIT_REVISION} && \
        ./autogen.sh && \
        ./configure --disable-bench --disable-tests --without-gui --with-incompatible-bdb && \
        make

RUN ls /usr/src/bitcoin/src

FROM ubuntu:20.04

ENV COIN_DIR btccoin
ENV COIN_RPC_USER user
ENV COIN_RPC_PASSWORD password
ENV COIN_RPC_PORT 30000

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        curl \
        libboost-chrono1.71.0=1.71.0-6ubuntu6 \
        libboost-filesystem1.71.0=1.71.0-6ubuntu6 \
        libboost-program-options1.71.0=1.71.0-6ubuntu6 \
        libboost-random1.71.0=1.71.0-6ubuntu6 \
        libboost-thread1.71.0=1.71.0-6ubuntu6 \
        libdb5.3++=5.3.28+dfsg1-0.6ubuntu2 \
        libevent-2.1-7=2.1.11-stable-1 \
        libevent-pthreads-2.1-7=2.1.11-stable-1 \
        libminiupnpc17=2.1.20190824-0ubuntu2 \
        libsodium23=1.0.18-1 \
        libzmq5=4.3.2-2ubuntu1 && \
        rm -rf /var/lib/apt/lists/* && \
        /usr/sbin/groupadd -g 1000 node && \
        /usr/sbin/useradd -u 1000 -g node node && \
        mkdir -p /wallets/bin && \
        mkdir -p /wallets/${COIN_DIR}/data && \
        chown -R node:node /wallets/${COIN_DIR}

COPY --from=builder /usr/src/bitcoin/src/bitcoind /wallets/bin/

VOLUME /wallets/${COIN_DIR}

EXPOSE ${COIN_RPC_PORT}

HEALTHCHECK CMD curl \
        --fail \
        -X POST \
        --user ${COIN_RPC_USER}:${COIN_RPC_PASSWORD} \
        -H "Content-Type: text/plain" \
        --data-binary '{"jsonrpc":"1.0","id":"healthcheck","method":"getblockchaininfo","params":[]}' \
        127.0.0.1:${COIN_RPC_PORT} \
        || exit 1

USER node

CMD ["/wallets/bin/bitcoind", "-datadir=/wallets/btccoin/data", "-server"]
