import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name:'cart',
  initialState:{
    cartItems:[],
    
  },
  reducers:{
    add:(state,action)=>{

      const item = state.cartItems.find((item)=>item._id == action.payload._id);
      
      if(item){
        item.quantity +=1;        
      }

      else{state.cartItems.push({...action.payload, quantity:1});}
    },

    remove:(state, action)=>{
      state.cartItems = state.cartItems.filter((item)=>item._id !== action.payload);
    },

    increment:(state,action)=>{
       const item = state.cartItems.find((item)=>item._id == action.payload);      
      
        item.quantity +=1;              
    },

    decrement:(state,action)=>{
       const item = state.cartItems.find((item)=>item._id == action.payload);      
      
       if (item.quantity >1)
       {
        item.quantity -=1;
       }
        else{
          state.cartItems = state.cartItems.filter((item)=>item._id !== action.payload);
        }
    },

    clearCart:(state)=>{
      state.cartItems = [];
    }
    
    },
});

export const { add, remove, increment, decrement, clearCart } = cartSlice.actions;
export default cartSlice.reducer;