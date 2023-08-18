import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};
//
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // state.items.push(action.payload);
      
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count:1
        })
      }
      state.totalPrice = state.items.reduce((sum, objName) => {
        return objName.price * objName.count + sum;
      }, 0)
     },
    minusItem(state, action) {
    const findItems = state.items.find((obj) => obj.is === action.payload.id) 
      if(findItems.count) {
      findItems.count--; 
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = 0;
    },
    clearItems(state ) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
