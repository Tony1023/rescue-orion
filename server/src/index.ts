import express from 'express';
import http from 'http';
import routes from './routes';
import cors from 'cors';

const PORT = process.env.PORT || 9000;

const app = express();
const server = http.createServer(app);
server.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));
app.use(express.json());

const whitelist = [
  undefined,
  'http://localhost:3000',
  'https://rescue-orion-beta.netlify.app',
  'http://localhost'
]

app.use(cors({
  origin: function(origin, callback) {
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
