const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const userService = require("../services/user.service");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWTPRIVATEKEY,
    },
    async (jwt_payload, done) => {
      const userName = jwt_payload.username;
      const user = await userService.findUserByUsername(userName);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }
  )
);

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      fbGraphVersion: "v3.0",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile: ", profile);
    }
  )
);

passport.authenticate = passport.authenticate(
  ["jwt", "facebook-token"],
  { session: false },
  (information, user, error) => {
    console.log("error: ", error);
    console.log("user: ", user);
  }
);

module.exports = passport;
