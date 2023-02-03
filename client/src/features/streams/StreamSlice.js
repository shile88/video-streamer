import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../api/streams";

export const getStreams = createAsyncThunk("streams/getStreams", async () => {
  const response = await api.get("/streams");
  return response.data;
});

export const createStreams = createAsyncThunk(
  "streams/createStreams",
  async (request) => {
    const response = await api.post("/streams", request);
    return response.data;
  }
);

export const updateStreams = createAsyncThunk(
  "streams/updateStreams",
  async (request) => {
    const { id } = request;
    const response = await api.put(`/streams/${id}`, request);
    return response.data;
  }
);

export const deleteStreams = createAsyncThunk(
  "/streams/deleteStreams",
  async (request) => {
    const { id } = request;
    const response = await api.delete(`/streams/${id}`);
    return response.data;
  }
);

const initialState = {
  streams: [],
  user: [],
};

const streamSlice = createSlice({
  name: "streams",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user.push(action.payload);
    },
    removeUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStreams.fulfilled, (state, action) => {
        return { ...state, streams: action.payload };
      })
      .addCase(createStreams.fulfilled, (state, action) => {
        state.streams.push(action.payload);
      })
      .addCase(updateStreams.fulfilled, (state, action) => {
        const { id } = action.payload;
        const streams = state.streams.filter((stream) => stream.id !== id);
        state.streams = [...streams, action.payload];
      })
      .addCase(deleteStreams.fulfilled, (state, action) => {
        const { id } = action.payload;
        const streams = state.streams.filter((stream) => stream.id !== id);
        state.streams = streams;
      });
  },
});

export const allStreams = (state) => state.streams.streams;
export const selectStreamById = (state, streamId) =>
  state.streams.streams.find((stream) => stream.id === streamId);
export const { addUser, removeUser } = streamSlice.actions;
export const getUser = (state) => state.streams.user;
export default streamSlice.reducer;
