import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import api from './routes';

const app = express();
const port = 3000;
const db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server');});
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/codelab')

app.use('/', express.static(path.join(__dirname, './../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
  secret: 'CodeLab1$1$234',
  resave: false,
  saveUninitialized: true
}));
app.use ('/api', api);
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Sonething brkoe!');
});

app.get('./hello', (req,res) => {
  return res.send('Hello React CodeLab!!');
});

app.listen(port, () => {
  console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');
  const config = require('../webpack.dev.config');
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(
    devPort, () => {
      console.log('webpack-dev-server is listening on port', devPort);
    }
  );
}
