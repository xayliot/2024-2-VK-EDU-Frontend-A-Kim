import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        chatInfo: null,
        loading: true,
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.unshift(action.payload);
        },
        setChatInfo: (state, action) => {
            state.chatInfo = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setMessages, addMessage, setChatInfo, setLoading } = chatSlice.actions;

export default chatSlice.reducer;