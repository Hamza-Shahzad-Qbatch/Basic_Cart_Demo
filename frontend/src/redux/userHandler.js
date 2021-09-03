import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../axios_config';

export const registerUser = createAsyncThunk(
    'register_user',
    async ({ name, email, password }, { rejectWithValue }) => {
        console.log('Name : ' + name);
        const config = {
            method: 'POST',
            data: { name, email, password },
            url: '/register'
        };
        try {
            const result = await axios(config);
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'login_user',
    async ({ email, password, old_token_id }, { rejectWithValue }) => {
        const config = {
            method: 'POST',
            data: { email, password, old_token_id },
            url: '/login'
        };
        try {
            const result = await axios(config);
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUserData = createAsyncThunk(
    'fetch_user_data',
    async (token, { rejectWithValue }) => {
        console.log('Token : ' + token)
        const config = {
            method: 'GET',
            url: '/user',
            headers: {
                authorization: `user_token ${token}`
            }
        };
        try {
            const result = await axios(config);
            console.log('Result : ' + result);
            return result.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        password: '',
        token: '',
        user_login_status: false,
        user_register_status: false,
        loading: false,
        error: ''
    },
    reducers: {
        clearUserState(state) {
            state.name = '',
            state.email = '',
            state.password = '',
            state.token =  '',
            state.user_login_status = false,
            state.user_register_status = false
        }
    },
    extraReducers: {
        [registerUser.fulfilled]: (state, action) => {
            state.user_register_status = true;
        },
        [registerUser.rejected]: (state, action) => {
            state.user_register_status = false;
            state.error = action.payload;
        },
        
        [loginUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.user_login_status = true;
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.loading = false;
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [fetchUserData.fulfilled]: (state, action) => {
            state.user_login_status = true;
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        }
    }
});

export const { clearUserState } = userSlice.actions
export default userSlice.reducer;
