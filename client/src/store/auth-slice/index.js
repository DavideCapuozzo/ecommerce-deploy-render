import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
}

export const registerUser = createAsyncThunk("/auth/register",
    async (formData) => {
        //in quanto ho indicato nel mio server>server.js la porta 5000 e il resto del percorso e' 
        // quello inserito sempre nello stesso file che mi permette di accedere alle routes quindi 
        // andro a completare il mio link con register che 'e la route 
        // che mi permette di accedere al controller 
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData, {
            withCredentials: true
        });

        return response.data;
    }
)

export const loginUser = createAsyncThunk("/auth/login",
    async (formData) => {
        //in quanto ho indicato nel mio server>server.js la porta 5000 e il resto del percorso e' 
        // quello inserito sempre nello stesso file che mi permette di accedere alle routes quindi 
        // andro a completare il mio link con register che 'e la route 
        // che mi permette di accedere al controller 
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData, {
            withCredentials: true
        });

        return response.data;
    }
)


export const logoutUser = createAsyncThunk("/auth/logout",
    async () => {
        //in quanto ho indicato nel mio server>server.js la porta 5000 e il resto del percorso e' 
        // quello inserito sempre nello stesso file che mi permette di accedere alle routes quindi 
        // andro a completare il mio link con register che 'e la route 
        // che mi permette di accedere al controller 
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, {
            withCredentials: true
        });

        return response.data;
    }
)


/* export const checkAuth = createAsyncThunk("/auth/checkauth",
    async() => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, 
            {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate,',
                    
                }
            }
        );

        return response.data;
    }
) */

export const checkAuth = createAsyncThunk("/auth/checkauth",
    async (token) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
            {
                headers: {
                    Authorization : `Bearer ${token}`,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate,',

                }
            }
        );

        return response.data;
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {},
        resetTokenAndCredentials : (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
                state.token = action.payload.token;
                sessionStorage.setItem('token', JSON.stringify(action.payload.token))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.token = null
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success ? true : false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
    }
})


export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;
