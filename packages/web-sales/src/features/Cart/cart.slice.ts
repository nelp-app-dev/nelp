import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export interface CartItem {
  id: string;
  quantity: number;
  price: number;
  product: { name: string; price: number; image: string };
}

export interface Cart {
  id: string | null | undefined;
  total: number;
  items: CartItem[];
}

// const getItemIndex = (state: CartItem[], idToFind: string): number => {
//   const ids = state.map((item) => item.id);
//   return ids.indexOf(idToFind);
// };

export const getCart = createAsyncThunk('cart/getCart', async () => {
  const { data } = await axios(`https://nelp.com:8000/v1/carts/find`, {
    method: 'get',
    withCredentials: true,
  });

  return data;
});

export const addItem = createAsyncThunk(
  'cart/addItem',
  async (params: { cart: any; product: any }) => {
    const { data } = await axios(`https://nelp.com:8000/v1/carts/add-item`, {
      method: 'post',
      data: { product: params.product },
      withCredentials: true,
    });

    return data;
  },
);

export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async (params: { cart: any; product: any; quantity: number }) => {
    const { data } = await axios(`https://nelp.com:8000/v1/carts/remove-item`, {
      method: 'delete',
      data: { product: params.product, quantity: params.quantity },
      withCredentials: true,
    });
    return data;
  },
);

// export const deleteCart = createAsyncThunk(
//   'cart/deleteCart',
//   async (parameters: { productId: string }) => {
//     const { data } = await axios.delete(
//       `http://localhost/api/cart/${parameters.productId}`,
//     );
//     return data.cartItems;
//   },
// );

const initialState: Cart = {
  id: null,
  total: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state, action) => {});
    builder.addCase(getCart.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(getCart.rejected, (state, action) => {});

    builder.addCase(addItem.pending, (state, action) => {});
    builder.addCase(addItem.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addItem.rejected, (state, action) => {});

    builder.addCase(removeItem.pending, (state, action) => {});
    builder.addCase(removeItem.fulfilled, (state, action) => {
      return action.payload || initialState;
    });
    builder.addCase(removeItem.rejected, (state, action) => {});
  },
});

export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
