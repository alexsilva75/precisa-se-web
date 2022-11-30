import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  users: [];
  filteredUsers: [];
  filters: [];
}
const initialState = {
  users: [],
  filteredUsers: [],
  filters: [],
} as UsersState;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
