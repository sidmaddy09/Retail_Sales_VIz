import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../components/retail_data";

interface DataState {
  productData: ProductData
}

interface DataState {
    productData: ProductData;
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    productData: [],
    loading: false,
    error: null,
};


const dataSlice = createSlice({
    name: 'productData',
    initialState,
    reducers: {
        fetchDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action: PayloadAction<ProductData>) => {
            state.productData = action.payload;
            state.loading = false;
        },
        fetchDataFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchDataSuccess } = dataSlice.actions;
export default dataSlice.reducer;