import { useReducer } from 'react';

import GymContext from './GymContext.js';

const defaultCartState = {
  token: "",
  address: "",
  addressId: 1,
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'TOKEN') {
    return ({ ...state, token: action.token })
  }

  if (action.type === 'ADDRESS') {
    return ({ ...state, address: action.address })
  }

  if (action.type === 'ADDRESSID') {
    return ({ ...state, addressId: action.id })
  }

  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      token: state.token,
      address: state.address,
      addressId: state.addressId,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    let step;
    if (action.id <= 13)
      step = 0.5;
    else
      step = 1;
    const updatedTotalAmount = state.totalAmount - existingItem.price * step;
    let updatedItems;
    if (existingItem.amount === step) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - step };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      token: state.token,
      address: state.address,
      addressId: state.addressId,
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === 'CLEAR') {
    return {
      ...defaultCartState,
      token: state.token,
      address: state.address,
      addressId: state.addressId,
    };
  }

  return defaultCartState;
};

const GymProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addAddressToCartHandler = (adress) => {
    dispatchCartAction({ type: 'ADDRESS', address: adress });
  }

  const addAddressIdToCartHandler = (id) => {
    dispatchCartAction({ type: 'ADDRESSID', id: id });
  };

  const addTokenToCartHandler = (token) => {
    dispatchCartAction({ type: 'TOKEN', token: token });
  };

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartCtx = {
    token: cartState.token,
    items: cartState.items,
    address: cartState.address,
    addressId: cartState.addressId,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    addToken: addTokenToCartHandler,
    addAddress: addAddressToCartHandler,
    addAddressId: addAddressIdToCartHandler,
  };

  return (
    <GymContext.Provider value={cartCtx}>
      {props.children}
    </GymContext.Provider>
  );
};

export default GymProvider;