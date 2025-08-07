# Bitcoin indexer - Backend

The purpose of this project is to store and index Bitcoin OP_RETURN data for all transactions after a certain block. This data will then be served on an HTTP endpoint as a JSON payload.

- It must serve a `/opreturn/${opReturnData}` endpoint

Rules
- A) Implement in Javascript using Node.js
- B) You can use ANY 3rd-party npm library
- C) You must use Postgres as the database
- D) You can use the Bitcoin mainnet or testnet
- E) You must use bitcoind

### Technology Stack

- TypeScript
- NodeJS
- Express
- Sequelize
- Postgres

### Clone the project

1. Clone the repository:

   ```shell
   git clone https://github.com/ExodusMovementInterviews/VictorGarcia.git
   ```

1. Move into the newly created folder:

   ```shell
   cd VictorGarcia
   ```

### Run the Bitcoin Mainnet Node

1. Build and Run the container:

   ```shell
   cd node
   chmod +x build.sh
   chmod +x mkcontainer.sh
   ./build.sh
   ./mkcontainer.sh
   ```

1. Check the node is running and syncing:

   ```shell
   docker logs -f btc-1.0
   ```

1. Wait until the node is fully synced

### Run the Postgres database

```sh
docker-compose -f docker/docker-compose.yml up -d
```

Verify the DB is running:

```sh
docker ps | grep 'exodus-db'
docker logs -f exodus-db
```

### Run the API service

Open a terminal and follow the next steps to install the project:

1. Install the project dependencies:

   ```shell
   npm install
   ```

1. [Optional] Create a local `.env` file. This can be used to point the server and set local variables.

   To use `.env.sample` as a starting place, you can copy it to `.env` with the following command:

   ```shell
   cp .env.sample .env
   ```

   Set `INITIAL_HEIGHT` if you want the indexer to start walking from an specific block

1. Run the service. It auto-updates the
   application as you make changes in the code. To run the project in
   development mode, use the following command:

   ```shell
   npm start
   ```

To verify that the project is running, your terminal should display:

```js
[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts,json
[nodemon] starting `node -r ts-node/register/transpile-only src/index.ts`
[2021-06-17 19:35:14] INFO (API Server/123119 on vick-pc): 🚀 API Server up and running in development @ http://localhost:3000
[2021-06-17 19:35:14] INFO (API Server/123119 on vick-pc): Database connection has been established successfully.
```

After 10 seconds the service will start indexing OP_RETURN transactions as they get mined, you can debug it by looking at the logs:

```js
[2021-06-17 19:35:24] INFO (API Server/123119 on vick-pc): OP_RETURN Indexer has started...
[2021-06-17 19:35:24] DEBUG (API Server/123119 on vick-pc): Getting block 448511
[2021-06-17 19:35:54] DEBUG (API Server/123119 on vick-pc): New OP_RETURNS is going to be indexed: {"opReturn":"38dc897545e5935516e7eaca9d95a2f6bbdf309f244bd1c219182b7fd4c408f0","decodedOpReturn":"8܉uE�U\u0016��ʝ�����0�$K��\u0019\u0018+��\b�","txid":"d3d5f42df6aa008cda51edf8c663634fb26c45912acdac3ee56fd95f61985984","blockHeight":448511,"blockHash":"0000000000000000022240653b08f2de4542a3feed2ab40d4d3a30e651b9a033"}
[2021-06-17 19:35:54] DEBUG (API Server/123119 on vick-pc): New OP_RETURNS is going to be indexed: {"opReturn":"d57bbaaa7ae059f9f1e36617a8c45e32c6ef78554e30c2fd85a690e81bba2e8d","decodedOpReturn":"�{��z�Y���f\u0017��^2��xUN0������\u001b�.�","txid":"00f54f45d8465f49d3ca345a31209ec77884957788aba3edcdd049af71304d42","blockHeight":448511,"blockHash":"0000000000000000022240653b08f2de4542a3feed2ab40d4d3a30e651b9a033"}
[2021-06-17 19:35:54] DEBUG (API Server/123119 on vick-pc): New OP_RETURNS is going to be indexed: {"opReturn":"9d92a654becfb54f17542cb7ba6460257cc8ed8f2a172551904c1b8ab1b075daac7410cd3bab48dff23280c598604bea22b3c2864bdb","decodedOpReturn":"���T�ϵO\u0017T,��d`%|��*\u0017%Q�L\u001b���uڬt\u0010�;�H��2�Ř`K�\"�K�","txid":"b1f869f3ebc97f30c25dfda189f0458f5b62ae73b223619f19dc1c46ce8523dc","blockHeight":448511,"blockHash":"0000000000000000022240653b08f2de4542a3feed2ab40d4d3a30e651b9a033"}
[2021-06-17 19:35:54] DEBUG (API Server/123119 on vick-pc): New OP_RETURNS is going to be indexed: {"opReturn":"f10eb5e0d4b6792f3f48cdb5420daa6c0d8238351e3b007d72b597d0","decodedOpReturn":"�\u000e��Զy/?H͵B\r�l\r�85\u001e;\u0000}r���","txid":"c22786fd8bf87020fd8b074018103227724fac6dff98ba882c9d4861a4f8c81f","blockHeight":448511,"blockHash":"0000000000000000022240653b08f2de4542a3feed2ab40d4d3a30e651b9a033"}
[2021-06-17 19:35:54] DEBUG (API Server/123119 on vick-pc): New OP_RETURNS is going to be indexed: {"opReturn":"4f41010002a0a57b80abf0e07400","decodedOpReturn":"OA\u0001\u0000\u0002��{����t\u0000","txid":"83c52213eeef11df52727a581acab307bbb3f63d2d29f4e53344fb9737ace0f6","blockHeight":448511,"blockHash":"0000000000000000022240653b08f2de4542a3feed2ab40d4d3a30e651b9a033"}
[2021-06-17 19:35:54] DEBUG (API Server/123119 on vick-pc): New OP_RETURNS is going to be indexed: {"opReturn":"4f410100048088a5a9a30780a094a58d1db0e0d34790b9bb831500","decodedOpReturn":"OA\u0001\u0000\u0004�����\u0007�����\u001d���G����\u0015\u0000","txid":"c852e9832aaf32d5e9b186851cc6b4830fd40a7e5ed27bedf4a91c923e0d03f0","blockHeight":448511,"blockHash":"0000000000000000022240653b08f2de4542a3feed2ab40d4d3a30e651b9a033"}
[2021-06-17 19:35:54] DEBUG (API Server/123119 on vick-pc): New OP_RETURNS is going to be indexed: {"opReturn":"4f41010002d082a802809bee0200","decodedOpReturn":"OA\u0001\u0000\u0002Ђ�\u0002���\u0002\u0000","txid":"616472faa850862ea6e43ff07f266bb3b52b52ed4c3ee968271ce0e24252c37d","blockHeight":448511,"blockHash":"0000000000000000022240653b08f2de4542a3feed2ab40d4d3a30e651b9a033"}
[2021-06-17 19:35:54] INFO (API Server/123119 on vick-pc): New 7 OP_RETURNS has been indexed.
```

### Validate OP_RETURN it's being indexed:

> Query the endpoint `localhost:3000/opreturn/:opReturnData`

Example:

```shell
curl --location --request GET 'localhost:3000/opreturn/4153435249424553504f4f4c30315049454345'
```

Respose:

```json
[
  {
    "opReturn": "4153435249424553504f4f4c30315049454345",
    "blockHash": "000000000000000002ff31535596b32e297dfd01e22ac6885008c4ae19e8958b",
    "blockHeight": 415004,
    "decodedOpReturn": "ASCRIBESPOOL01PIECE",
    "txid": "19c924bb0a1899f6953b00057ae980aead76f51a8f03e4321036348c42cb4163",
    "createdAt": "2021-06-17T23:28:47.557Z",
    "updatedAt": "2021-06-17T23:28:47.557Z"
  },
  {
    "opReturn": "4153435249424553504f4f4c30315049454345",
    "blockHash": "000000000000000002ff31535596b32e297dfd01e22ac6885008c4ae19e8958b",
    "blockHeight": 415004,
    "decodedOpReturn": "ASCRIBESPOOL01PIECE",
    "txid": "7056c6ce3c32e9695ba7ebbdd9a222fce7c7dded27b154009655a10a62b2946d",
    "createdAt": "2021-06-17T23:28:47.557Z",
    "updatedAt": "2021-06-17T23:28:47.557Z"
  },
  {
    "opReturn": "4153435249424553504f4f4c30315049454345",
    "blockHash": "0000000000000000039dbb85f9031eff8db16689fda951a5b18743cdefec48b8",
    "blockHeight": 441927,
    "decodedOpReturn": "ASCRIBESPOOL01PIECE",
    "txid": "e9aeefb20b1b67e84e4a608b5544305144b57cf3ae93d1bfc9a350bfd010a6a5",
    "createdAt": "2021-06-18T00:19:32.618Z",
    "updatedAt": "2021-06-18T00:19:32.618Z"
  }
]
```

## Coding Styles

This project uses TypeScript. While developing, use ESLint and follow the
Airbnb JavaScript Styling Guide. To run the linter and the static type checker,
execute:

```shell
npm run lint
```
