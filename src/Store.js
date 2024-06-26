import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  category: [],
  lastDocumentsFromList: [],

  id: '',
  rhinoID: '',
  isAuth: false,
  jwtToken: '',
  refreshToken: '',

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
    case 'GET_LAST_DOCUMENTS_FROM_LIST':
      return { ...state, lastDocumentsFromList: action.payload };
    case 'IS_AUTH':
      return { ...state, isAuth: true };
    case 'IS_NO_AUTH':
      return { ...state, isAuth: false };
    case 'BARCODE_ID':
      return { ...state, id: action.payload };
    case 'BARCODE_RHINOID':
      return { ...state, rhinoID: action.payload };
    case 'JWT':
      return { ...state, jwtToken: action.payload };
    case 'REFRESH_TOKEN':
      return { ...state, refreshToken: action.payload };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
