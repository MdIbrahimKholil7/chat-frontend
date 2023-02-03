import { createSlice } from "@reduxjs/toolkit";
import { friend, Users } from "../../types/types";

interface State {
    openMenu: boolean,
    openModal: any | null,
}

const initialState: State = {
    openMenu: false,
    openModal: null
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        openMenuFn: (state, action) => {
            state.openMenu = !state.openMenu;
        },
        openProfileModal: (state, action) => {
            state.openModal = action.payload;
        },
    },
});

export const { openMenuFn, openProfileModal } = menuSlice.actions;
export default menuSlice.reducer;
