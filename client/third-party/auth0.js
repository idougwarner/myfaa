import Auth0Lock from 'auth0-lock';

const baseURL =
  window.BASE_URL || `${window.location.protocol}//${window.location.host}`;

export const login = (nextUrl, options) => {
  const lockOptions = {
    auth: {
      redirectUrl: `${baseURL}/login-callback`,
      params: {
        state: nextUrl || '/',
        scope: 'openid profile email'
      }
    },
    theme: {
      logo: '',
      primaryColor: '#37a000'
    },
    allowedConnections: ['Username-Password-Authentication'],
    rememberLastLogin: true,
    languageDictionary: {
      title: 'Welcome to MyFAA',
      signUpTitle: 'Admin Registration'
    },
    allowLogin: options.allowLogin,
    allowSignUp: options.allowSignUp,
    additionalSignUpFields: [
      {
        name: 'firstName',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png',
        placeholder: 'First Name'
      },
      {
        name: 'lastName',
        placeholder: 'Last Name',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png'
      },
      {
        name: 'phoneNumber',
        placeholder: 'Phone Number',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png',
        validator: (cell) => ({
          valid: cell.length >= 10,
          hint: 'Must be a valid phone number'
        })
      }
    ],
    defaultADUsernameFromEmailPrefix: false,
    showTerms: false
  };

  if (options.prefill) {
    lockOptions.prefill = options.prefill;
  }
  if (options.additionalSignUpFields) {
    lockOptions.additionalSignUpFields = lockOptions.additionalSignUpFields.concat(
      options.additionalSignUpFields
    );
  }

  const lock = new Auth0Lock(
    window.AUTH0_CLIENT_ID,
    window.AUTH0_DOMAIN,
    lockOptions
  );

  lock.show();
};

export const logout = () => {
  const lock = new Auth0Lock(window.AUTH0_CLIENT_ID, window.AUTH0_DOMAIN);
  lock.logout({
    returnTo: `${baseURL}/logout-callback`,
    client_id: window.AUTH0_CLIENT_ID
  });
};
