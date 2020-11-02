This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Getting started
Run
```
$ yarn install
```
or
```
$ npm install
```

Go to src/metadata and run
```
$ python gen.py
```

Then go back to root directory and run
```
$ yarn start
```
or
```
$ npm start
```
to start application on localhost:3000

# ENV setup!!!
Create a file in server/ called `.env` and put
```
REACT_APP_API_BASE_URL=http://localhost:9000
```
as the file content.

# Testing
All the tests files are in [src/__tests__](src/__tests__). They use [jest](https://jestjs.io/docs/en/getting-started).

If you haven't already, run `yarn install`.

Run `yarn test` and you'll see an interactive console.
