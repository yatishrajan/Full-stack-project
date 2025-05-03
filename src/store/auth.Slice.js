import {createSlice} from '@reduxjs/toolkit'
const initialState={
    status:false,
    userdata:null
}
export const authSlice=createSlice({
    name:"authservice",
    initialState,
    reducers:{
        login:(state,actions)=>{
            state.status=true;
            state.userdata=actions.payload; // Remove .userdata, just set the payload directly
        },
        logout:(state)=>{
            state.status=false;
            state.userdata=null;
        }
    }
})
export const {login,logout}=authSlice.actions
export default authSlice.reducer