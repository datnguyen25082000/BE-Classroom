const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const userService = require("../services/user.service");
const userTypeConstant = require('../constants/user-type.constant')

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
      let user = await userService.findUserByUsername(profile.id, userTypeConstant.FACEBOOK_USER)
      
      if (!user) {
        await userService.registerUser(profile.id, null, profile.displayName, userTypeConstant.FACEBOOK_USER)
        user = await userService.findUserByUsername(profile.id, userTypeConstant.FACEBOOK_USER)
      }

      done(null, user)
    }
  )
);

passport.authenticate = passport.authenticate(["jwt", "facebook-token"], {
  session: false,
});

module.exports = passport;
