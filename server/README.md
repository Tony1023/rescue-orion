# Server of Rescue Orion

If you don't have `nodemon`, I recommend installing it to watch for changes in code for hot-reloads.
```
npm install -g nodemon
```
and also
```
yarn install
```

Then, for development, run
```
yarn run develop
```
which must be run with `nodemon` installed.

This will start the backend with `ts-node`, but it does not do static analysis on the fly. Therefore, you should always run the production mode to check for problems.

For example, if you use `require` as opposed to `import` in code, in development mode `ts-node` will not spot the problem, but running production `tslint` will let you know the error.

For production, run
```
yarn start
```

# ENV setup!!!
Create a file in server/ called `.env` and put
```
JWT_SECRET=JefferyMiller401
CLIENT_DOMAIN=http://localhost:3000
```
as the file content. You can choose any JWT_SECRET you want.

# Testing
All the tests files are in [src/__tests__](src/__tests__). They use [jest](https://jestjs.io/docs/en/getting-started).

If you haven't already, run `yarn install`.

There are two ways to run the tests: `yarn test` and `yarn run watch-test`.

If you run `yarn test`, then all the tests will be executed once.

If you run `yarn run watch-test`, there will be an interactive console. You might need to `npm install --global npx` to install the `npx` package in order to use the interactive console.
