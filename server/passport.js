import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import wrap from '@server/lib/wrap';
import { User } from '@server/models';
import localAuthHelpers from '@server/passport-local';

export function setupLocalAuthPassport() {
  const strategy = new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    wrap(async (req, username, password, done) => {
      const lowerCaseEmail = username.toLowerCase();
      const existingUser = await User.query()
        .findOne({
          email: lowerCaseEmail
        })
        .withGraphFetched('role');

      if (req.body.authType && !localAuthHelpers[req.body.authType]) {
        return done(null, false);
      }

      try {
        const user = await localAuthHelpers[req.body.authType]({
          lowerCaseEmail,
          password,
          existingUser,
          reqBody: req.body
        });

        return done(null, user);
      } catch (error) {
        return done(null, false, error.message);
      }
    })
  );

  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(
    wrap(async (id, done) => {
      const intId = parseInt(id, 10);
      if (Number.isNaN(intId)) {
        done(null, false);
        return;
      }

      const user = await User.query().findById(id).withGraphFetched('role');
      done(null, user || false);
    })
  );

  return {
    loginCallback: [
      passport.authenticate('local'),
      (req, res) => {
        res.redirect(req.body.nextUrl || '/');
      }
    ]
  };
}

export default {
  local: setupLocalAuthPassport
};
