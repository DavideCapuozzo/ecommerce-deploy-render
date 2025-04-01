import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList : [],
    productDetails : null
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts', async({filterParams, sortParams}) => {
    console.log('fetchAllProducts is being called...');
    try{
        const query = new URLSearchParams({
            ...filterParams, 
            sortBy : sortParams
        })
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`);
        console.log(result?.data, "CHIAMATA API FETCHALLPRODUCTS")
        return result?.data

    }catch (error){
        console.error('Error during API call:', error);
        throw error; 
    }
    
    
})


export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails', async(id) => {
    try{

        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`);
        return result?.data

    }catch (error){
        console.error('Error during API call:', error);
        throw error; 
    }
    
    
})

const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers:{
        setProductDetails: (state)=>{
            state.productDetails = null
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchAllFilteredProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                console.log(action.payload, 'ACTION PAYLOAD shoppingProductSlice')
                state.isLoading = true;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
            })
            .addCase(fetchProductDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                console.log(action.payload, 'ACTION PAYLOAD shoppingProductSlice')
                state.isLoading = true;
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetails = null;
            })
    }
})

export const { setProductDetails } = shoppingProductSlice.actions

export default shoppingProductSlice.reducer;