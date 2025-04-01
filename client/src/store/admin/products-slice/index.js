import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState ={
    isLoading: false,
    productList: [],
};


export const addNewProduct = createAsyncThunk('/products/addnewproduct', async(FormData) => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`, FormData, {
        headers: {
            "Content-Type": "application/json",
        }
    })

    return result?.data
})

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async() => {
    console.log('fetchAllProducts is being called...');
    try{
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`);
        console.log(result?.data, "CHIAMATA API FETCHALLPRODUCTS")
        return result?.data

    }catch (error){
        console.error('Error during API call:', error);
        throw error; 
    }
    
    
})


export const editProduct = createAsyncThunk('/products/editProduct', async ({ id, formData }) => {
    console.log("##########################");
    console.log("Generated URL:", `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`);
    console.log("##########################");

    const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return result?.data;
});





export const deleteProduct = createAsyncThunk('/products/deleteProduct', async(id) => {
    const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`)

    return result?.data
})

export const testFetch = createAsyncThunk('/test/fetch', async () => {
    console.log('testFetch is being called...');
    return { data: [{ title: 'Test Product' }] };
});



const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                console.log('fetchAllProducts pending...');
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                console.log('fetchAllProducts fulfilled with data:', action.payload);
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                console.error('fetchAllProducts rejected with error:', action.error);
                state.isLoading = false;
                state.productList = [];
            })
            .addCase(testFetch.fulfilled, (state, action) => {
                console.log('testFetch fulfilled:', action.payload);
            });
    }
})

export default AdminProductsSlice.reducer;