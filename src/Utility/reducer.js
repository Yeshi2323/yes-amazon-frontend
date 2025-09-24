import { useReducer } from "react";
import { Type } from "./action.type";

// Initial state for the reducer
export const initialState = {
  basket: [],
};

// Reducer function to handle basket actions
export const reducer = (state, action) => {
  switch (action.type) {
    // Add item to basket
    case Type.ADD_TO_BASKET:
      // Check if item already exists in basket
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        // If not, add new item with amount 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        // If exists, increment the amount
        const updateBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return {
          ...state,
          basket: updateBasket,
        };
      }

    // Remove item from basket
    case Type.REMOVE_FROM_BASKET:
      // Find index of item to remove
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          // If amount > 1, decrement the amount
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // If amount == 1, remove item from basket
          newBasket.splice(index, 1);
        }
      }
      return {
        ...state,
        basket: newBasket,
      };
    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };
    // Set user
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    // Default case: return current state
    default:
      return state;
  }
};

// Example usage:
// const [state, dispatch] = useReducer(reducer, initialState);
