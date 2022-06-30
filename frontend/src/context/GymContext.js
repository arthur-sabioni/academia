import React from 'react';

const GymContext = React.createContext({
  token: null,
  userType: null,
  addToken: token => { },
  addUserType: userType => { },
  clear: () => { },
});

export default GymContext;