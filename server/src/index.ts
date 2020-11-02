import express from 'express';
import http from 'http';
import routes from './routes';
import cors from 'cors';

const PORT = process.env.PORT || 9000;

const app = express();
const server = http.createServer(app);
server.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send( "Hello world!" );
});

routes(app, server);
