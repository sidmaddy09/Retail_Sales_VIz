import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
    customer: string;
    review: string;
    score: number;
}

interface SalesItem {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
}

export type ProductData = {
    id: string;
    title: string;
    image: string;
    subtitle: string;
    brand: string;
    reviews: Review[];
    retailer: string;
    details: string[];
    tags: string[];
    sales: SalesItem[];
  };
  

interface DataState {
    productData: ProductData | null; // Changed to hold a single product
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    productData: null,
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

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;
export default dataSlice.reducer;