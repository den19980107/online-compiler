import cookieSession from 'cookie-session';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import keys from './config/keys';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import passport from 'passport';
import path from 'path';

// import routes
import authRoutes from './routes/auth-routes';
import userRoutes from './routes/user';
import compileRoute from './routes/compile'

const app = express();
const port = process.env.PORT || 5000;

// connect to mongodb
mongoose.connect(keys.MONGODB.MONGODB_URI, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("connected to mongo db");
  }
});

app.use(
  cookieSession({
    name: "session",
    keys: [keys.SESSION.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
);

// middleware
// parse cookies
app.use(cookieParser());
// express validator
app.use(expressValidator())
// body parser
app.use(bodyParser.json({ limit: '50mb' }));

// initalize passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport-setup')(passport)
// deserialize cookie from the browser

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// set up routes
app.use("/auth", authRoutes);
app.use('/user', userRoutes);
app.use('/compile', compileRoute);

app.use(express.static('client/build'))


app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
})
// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));
