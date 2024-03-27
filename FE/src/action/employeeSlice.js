import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = "http://localhost:5000/api";
// Post method
export const createEmployee = createAsyncThunk("postData", async (data) => {
  try {
    const formData = new FormData();
    for (let key in data){
      if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key]);
      }
    }

    const response = await axios.post(`${BASE_API_URL}/employee`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Get Method
export const fetchEmployee = createAsyncThunk("data", async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/employee`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

//edit Method
export const EditEmployee = createAsyncThunk(
  "editData",
  async ({ _id, ...data }) => {
    try {
      const formData = new FormData();
      for (let key in data){
        if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
          formData.append(key, data[key]);
        }
      }
      const response = await axios.put(
        `${BASE_API_URL}/employee/${_id}`,
        formData
      );
      console.log("Edit response: ", response);
      return response.data;
    } catch (error) {
      console.error("Edit error: ", error);
      throw error;
    }
  }
);

//delete  method
export const deleteEmployee = createAsyncThunk("deleteData", async (dataId) => {
  try {
    const response = await axios.delete(
      `${BASE_API_URL}/employee/${dataId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

//get Single by id
export const getEmployee = createAsyncThunk("getData", async (dataId) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/employee/${dataId}`
    );
    console.log("get Single: ", response);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const employeeSlice = createSlice({
  name: "EmployeeData",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // For Create
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // For Edit
      .addCase(getEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //For Delete
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
