import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  category: [],

  // cart: {
  //     cartItems: [],
  // }
};

function reducer(state, action) {
  switch (action.type) {
    // case 'CART_ADD_ITEM':
    // return {...state, cart: {...state.cart, cartItems}} ;

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return { ...state, userInfo: null };
    case 'GET_CATALOG':
      return { ...state, category: action.payload };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
