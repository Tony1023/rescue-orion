import express from 'express';
import http from 'http';
import routes from './routes';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
server.listen(9000, () => console.log(`server started at http://localhost:9000`));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send( "Hello world!" );
});

routes(app, server);
