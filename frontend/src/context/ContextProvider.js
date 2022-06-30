import { useReducer } from 'react';
import GymContext from './GymContext.js';

const INITIAL_STATE = {
  token: null,
  userType: null,
};

const ContextProvider = props => {
  const [state, dispatchAction] = useReducer(
    reducer,
    INITIAL_STATE
  );

  const addToken = token => dispatchAction({ type: 'TOKEN', value: token });

  const addUserType = userType => dispatchAction({ type: 'USERTYPE', value: userType });

  const clear = () => dispatchAction({ type: 'CLEAR' });

  const context = {
    token: state.token,
    userType: state.userType,
    addToken: addToken,
    addUserType: addUserType,
    clear: clear,
  };

  return (
    <GymContext.Provider value={context}>
      {props.children}
    </GymContext.Provider>
  );
};

const reducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case 'TOKEN':
      return ({ ...state, token: value })
    case 'USERTYPE':
      return ({ ...state, userType: value })
    case 'CLEAR':
      return ({ ...INITIAL_STATE })
    default:
      return ({ ...INITIAL_STATE })
  }
};

export default ContextProvider;