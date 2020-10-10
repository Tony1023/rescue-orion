import Express from 'express';
import http from 'http';
import routes from './routes';
import cors from 'cors';

const app = Express();

app.get("/", (req, res) => {
  res.send( "Hello world!" );
});
app.use(cors);

const server = http.createServer(app);

server.listen(9000, () => {
  console.log(`server started at http://localhost:9000`);
});

routes(app, server);
