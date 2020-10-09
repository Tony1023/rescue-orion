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
