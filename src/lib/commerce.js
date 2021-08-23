import Commerce from '@chec/commerce.js';

export const commerce = new Commerce(process.env.REACT_APP_COMMERCEJS_PUBLIC_KEY, true);

// the boolean true ensures a new Commerce store is created

// Commerce library is useful to handle the backend in this app 