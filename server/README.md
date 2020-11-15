# Server of Rescue Orion

Server app of the online Rescue Orion project.


## Environment Variables
Create a file in this directory named `.env` and put
```
JWT_SECRET=<your choice of secret string>
CLIENT_DOMAIN=<the domain of client app, used for CORS check>
NODE_ENV=<production/development>
```
as the file content.

## yarn commands
- yarn install
  - Installs all dependencies, needs to be run the first time you run this project.
- yarn run develop
  - Starts the app in development mode with `nodemon` and `ts-node`.
- yarn build
  - Compiles the project into `dist/`.
- yarn start
  - Compiles the project with `tsc` into `dist/`.
  - Starts the app with `node .`
- yarn test
  - Runs all unit tests once.
- yarn run watch-test
  - Starts an interactive console for running tests.

# Testing
All the tests files are in [src/__tests__](src/__tests__). They use [jest](https://jestjs.io/docs/en/getting-started).

If you run `yarn run watch-test`, there will be an interactive console. You might need to `npm install --global npx` to install the `npx` package in order to use the interactive console.
