import { createSlice } from '@reduxjs/toolkit';

import productsjson from '../products.json';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: productsjson.products,
    money: 100000000000,
    initialMoney: 100000000000,
  },
  reducers: {
    updateCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      item.count = action.payload.count;
      let spent = 0;
      state.items.map((item) => {
        spent += parseInt(item.count) * parseInt(item.productPrice);
        return item;
      });
      state.money = parseInt(state.initialMoney) - parseInt(spent);
    },
  },
});

export const { updateCount } = productsSlice.actions;
export default productsSlice.reducer;