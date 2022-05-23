import React from 'react';

const GymContext = React.createContext({
  token: "",
  address: "",
  addressId: 0,
  items: [],
  totalAmount: 0,
  addItem: (item) => { },
  addAddress: (address) => { },
  addAddressId: (id) => { },
  removeItem: (id) => { },
  clearCart: () => { },
  addToken: (token) => { }
});

export default GymContext;