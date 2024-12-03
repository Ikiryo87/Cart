import { useReducer } from "react";
import {
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE_ITEM) {
    let newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE_AMOUNT) {
    //Make a copy of state
    const newCart = new Map(state.cart);
    //Target the item.id we want to increase amount of
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount + 1 };
    // console.log(item);
    // Overwrite existing item in copied state
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE_AMOUNT) {
    //Make a copy of state
    const newCart = new Map(state.cart);
    //Target the item.id we want to decrease amount of
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    // If no more items:
    if (item.amount === 1) {
      newCart.delete(itemId);
      return { ...state, cart: newCart };
    }
    // If still items:
    const newItem = { ...item, amount: item.amount - 1 };
    // Overwrite existing item in copied state
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === LOADING) {
    return { ...state, loading: true };
  }
  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.payload.cart.map((item) => [item.id, item]));
    return { ...state, loading: false, cart: newCart };
  }
  throw new Error(`No matching ${action.type} - action`);
};
