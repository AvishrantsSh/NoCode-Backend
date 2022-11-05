const passport = require("passport");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async ({ _id }, done) => {
    try {
      let user = await User.findById(_id);
      if (!user) {
        throw new Error("User not found");
      }
      return done(null, user.getUserInfo());
    } catch (err) {
      done(null, false);
    }
  })
);

const userAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(401).json(err);
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    req.user = user;
    next();
  })(req, res);
};

module.exports.userAuth = userAuth;
