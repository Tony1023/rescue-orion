import express from 'express';
import http from 'http';
import routes from './routes';
import cors from 'cors';
import { CLIENT_DOMAIN } from './config';

const PORT = process.env.PORT || 9000;

const app = express();
const server = http.createServer(app);
server.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));
app.use(express.json());

const whitelist = [
  undefined,  // HTTP clients like postman or insomnia do not have Origin in their header
  'http://localhost',  // requests from the react testing frameworks do not have port numbers
  CLIENT_DOMAIN,
]

app.use(cors({
  origin(origin, callback) {
    const index = whitelist.indexOf(origin);
    if (index >= 0) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} not allowed by CORS`));
    }
  },
  optionsSuccessStatus: 200,
}));

app.get("/", (req, res) => {
  res.send( "Hello world!" );
});

routes(app, server);
