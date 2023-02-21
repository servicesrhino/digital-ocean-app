import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    userInfo: null,

    // cart: {
    //     cartItems: [],
    // }
};

function reducer(state, action) {
    switch(action.type) {
        // case 'CART_ADD_ITEM': 
        // return {...state, cart: {...state.cart, cartItems}} ;  

        case 'USER_SIGNIN':
            return {...state, userInfo: action.payload};

        default: 
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = {state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}