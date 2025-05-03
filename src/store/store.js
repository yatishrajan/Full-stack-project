import {configureStore} from '@reduxjs/toolkit'
import authSlice from './auth.Slice'
const store=configureStore({
    reducer:{
        authservice:authSlice,
    }
})
export default store;