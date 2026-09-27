import { configDotenv } from "dotenv";
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import morgan from "morgan";
configDotenv();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        (_, __, profile, done) => {
            return done(null, profile);
        },
    ),
);

app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", {
        session: false, 
        failureRedirect: "/",
    }),
    (req, res) => {
        console.log(req.user);
        res.send("Hello from Google");
    },
);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: `Check health of server`,
    });
});

export default app;
