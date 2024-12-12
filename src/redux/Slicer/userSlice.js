import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Lấy token từ localStorage (hoặc Redux Store nếu bạn lưu token ở đó)
const getAuthToken = () => {
  return localStorage.getItem("token"); // Hoặc từ Redux store nếu bạn sử dụng Redux để lưu token
};

// API call để tạo người dùng
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        "http://localhost:8081/api/users",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      return response.data; // Trả về dữ liệu người dùng sau khi tạo thành công
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để lấy thông tin người dùng theo ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`http://localhost:8081/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data; // Trả về dữ liệu người dùng theo ID
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để cập nhật thông tin người dùng
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `http://localhost:8081/api/users/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      return response.data; // Trả về thông tin người dùng sau khi cập nhật thành công
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để thay đổi mật khẩu người dùng
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ userId, currentPassword, newPassword }, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `http://localhost:8081/api/users/${userId}/password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      return response.data; // Trả về thông tin người dùng sau khi thay đổi mật khẩu thành công
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để lấy danh sách tất cả người dùng
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.get("http://localhost:8081/api/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data; // Trả về danh sách tất cả người dùng
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để cập nhật thông tin cho tất cả người dùng
export const updateAllUsers = createAsyncThunk(
  "user/updateAllUsers",
  async (userData, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        "http://localhost:8081/api/users",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      return response.data; // Trả về thông báo thành công sau khi cập nhật tất cả người dùng
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice để quản lý trạng thái của người dùng
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // Dữ liệu người dùng hiện tại
    users: [], // Danh sách tất cả người dùng
    status: "idle", // Trạng thái tải dữ liệu (idle | loading | succeeded | failed)
    error: null, // Lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý action createUser
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Lưu dữ liệu người dùng vào state
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      })

      // Xử lý action fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Lưu dữ liệu người dùng vào state
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      })

      // Xử lý action updateUser
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Cập nhật lại thông tin người dùng
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      })
      
      // Xử lý action updatePassword
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Không cần phải cập nhật lại user nếu chỉ thay đổi mật khẩu
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      })

      // Xử lý action fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload; // Lưu danh sách người dùng vào state
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      })
      
      // Xử lý action updateAllUsers
      .addCase(updateAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Cập nhật thành công không cần phải thay đổi thêm gì
      })
      .addCase(updateAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      });
  },
});

export default userSlice.reducer;
