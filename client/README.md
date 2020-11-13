# Client of Rescue Orion

Client app of the online Rescue Orion project, built with React.


## Environment Variables
Create a file in this directory named `.env` and put
```
REACT_APP_API_BASE_URL=<API base address>
```
as the file content.

## yarn commands
- yarn install
  - Installs all dependencies, needs to be run the first time you run this project.
- yarn start
  - Starts the app in development mode.
- yarn build
  - Compiles the project in production mode in `build/`.
- yarn test
  - Starts an interactive console for running tests.

# Testing
All the tests files are in [src/__tests__](src/__tests__). They use [jest](https://jestjs.io/docs/en/getting-started).
