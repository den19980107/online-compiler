import cookieSession from "cookie-session";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import keys from "./config/keys";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressValidator from "express-validator";
import passport from "passport";
import path from "path";
import config from "./config/default";

// import routes
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user";
import compileRoute from "./routes/compile";

const app = express();
const port = process.env.PORT || 5000;

let isMongodbConnected = false;
// connect to mongodb
mongoose.connect(keys.MONGODB.MONGODB_URI, (err) => {
    if (err) {
        isMongodbConnected = false;
        console.log(err);
    } else {
        isMongodbConnected = true;
        console.log("connected to mongo db");
    }
});

app.use(
    cookieSession({
        name: "session",
        keys: [keys.SESSION.COOKIE_KEY],
        maxAge: 24 * 60 * 60 * 100,
    })
);

// middleware
// parse cookies
app.use(cookieParser());
// express validator
app.use(expressValidator());
// body parser
app.use(bodyParser.json({ limit: "50mb" }));

// initalize passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport-setup")(passport);
// deserialize cookie from the browser

// set up cors to allow us to accept requests from our client
app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
    })
);

// set up routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/compile", compileRoute);

if (config.mode == "production") {
    app.use(express.static("client/build"));
    app.get("/*", function (req, res) {
        if (isMongodbConnected) {
            res.sendFile(
                path.resolve(__dirname, "../client", "build", "index.html")
            );
        } else {
            res.send("資料庫連線錯誤");
        }
    });
}
// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));
