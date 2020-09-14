import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import { Strategy as LocalStrategy } from 'passport-local';
import capitalizeString from 'lodash/capitalize';
import wrap from '@server/lib/wrap';
import { User } from '@server/models';
import localAuthHelpers from '@server/passport-local';
import { onboardingService } from '@server/services';
import { ONBOARDING_STEPS } from '@server/constants';

export function setupAuth0Passport() {
  const strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/login-callback`,
      state: false
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      done(null, profile);
    }
  );

  passport.use(strategy);

  passport.serializeUser((user, done) => {
    // This is the Auth0 user object, not the db one
    // eslint-disable-next-line no-underscore-dangle
    const auth0Id = user.id || user._json.sub;
    done(null, auth0Id);
  });

  passport.deserializeUser(
    wrap(async (id, done) => {
      // add new cacheable query
      const user = await User.query()
        .findOne({ auth0Id: id })
        .withGraphFetched('[onboardingStatus, companies]');
      done(null, user || false);
    })
  );

  return {
    loginCallback: [
      passport.authenticate('auth0', { failureRedirect: '/login' }),
      wrap(async (req, res) => {
        // eslint-disable-next-line no-underscore-dangle
        const auth0Id = req.user && (req.user.id || req.user._json.sub);
        if (!auth0Id) {
          throw new Error('Null user in login callback');
        }

        let redirectUrl = req.query.state || '/';
        const existingUser = await User.query().findOne({ auth0Id });
        if (!existingUser) {
          const userMetadata =
            // eslint-disable-next-line no-underscore-dangle
            req.user._json['https://myfaa/user_metadata'] ||
            // eslint-disable-next-line no-underscore-dangle
            req.user._json.user_metadata ||
            {};

          const onboardingStatus = {
            lastStep: ONBOARDING_STEPS.CREATE_ACCOUNT,
            roleName: userMetadata.roleName
          };

          if (userMetadata.moduleId) {
            onboardingStatus.moduleId = parseInt(userMetadata.moduleId, 10);
          }

          const userDataGraph = {
            auth0Id,
            // eslint-disable-next-line no-underscore-dangle
            email: req.user._json.email,
            firstName: capitalizeString(userMetadata.firstName) || '',
            lastName: capitalizeString(userMetadata.lastName) || '',
            phoneNumber: userMetadata.phoneNumber || '',
            onboardingStatus
          };

          const user = await User.query().insertGraphAndFetch(userDataGraph);
          redirectUrl = onboardingService.getNextStepUrl(user);
        }

        res.redirect(redirectUrl || '/');
      })
    ]
  };
}

export function setupLocalAuthPassport() {
  const strategy = new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    wrap(async (req, username, password, done) => {
      const lowerCaseEmail = username.toLowerCase();
      const existingUser = await User.query().findOne({
        email: lowerCaseEmail
      });

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

      const user = await User.query().findById(id);
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
  local: setupLocalAuthPassport,
  auth0: setupAuth0Passport
};
