// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import instance from "../../instance";

// export const getUser1 = createAsyncThunk("Users1/getUser1", async function (id) {
//     const { data } = await instance.get(`/chats/${id}/participants`);
//     console.log(data);
//     return data;
// });

// const testSlice = createSlice({
//     name: "test",
//     initialState: {
//         userTest: { name: "uknown" },
//     },

//     reducers: {
//         setUser2: (state, action) => {
//             state.userTest = action.payload;
//         },
//     },
// });

// export const { setUser2 } = testSlice.actions;

// export default testSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance";

export const getUser1 = createAsyncThunk("Users1/getUser1", async function (id, thunkAPI) {
    const { data } = await instance.get(`/chats/${id}/participants`);
    console.log(data);
    return data;
});

const testSlice = createSlice({
    name: "test",
    initialState: {
        userTest: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser1.fulfilled, (state, action) => {
            state.userTest = action.payload;
        });
    },
});

export default testSlice.reducer;
