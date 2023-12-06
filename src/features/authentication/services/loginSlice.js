import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "services/apiSlice" 

const initialState = {
  userToken: localStorage.getItem('userToken'),
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogOut: (state) => {
      state.userToken = '';
      state.userInfo = null;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload.userToken;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const { setUserToken, setUserInfo, setLogOut } = loginSlice.actions;


export const loginApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserInfo: builder.query({
      query: () => ({ url: '/users/me' }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_ME'],
    }),
    login: builder.mutation({
      query(userData) {
        return {
          url: '/auth',
          method: 'POST',
          body: userData
        }
      }
    }),

  })
})

export const { useLoginMutation, useGetUserInfoQuery } = loginApiSlice;

export default loginSlice.reducer;