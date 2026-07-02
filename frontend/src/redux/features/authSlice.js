import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name:'auth',
  initialState:{
    user:null,
    isAuthenticated:false,

  },
  reducers:{
    AuthSuccess:(state, action) =>{
      state.user=action.payload;
      state.isAuthenticated = true;
    },

  

    LogoutSuccess:(state, action) =>{
      state.user=null;
      state.isAuthenticated = false;
    }
  },
});

export const { AuthSuccess, LogoutSuccess} = authSlice.actions;
export default authSlice.reducer;