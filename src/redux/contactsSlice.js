import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";

export const initialContact = {

        items: [],
        loading: false,
        error: null

};

const handlePending = (state) => {
    state.contacts.loading = true;
};

const handleFetchFulfilled = (state, action) => {
    state.loading = false;
    state.error = null;
    state.items = action.payload;
};

const handleAddFulfilled = (state, action) => {
    state.loading = false;
    state.error = null;
    state.items.push(action.payload);
};

const handleDeleteFulfilled = (state, action) => {
    state.loading = false;
    state.error = null;
    state.items = state.items.filter(
        (contact) => contact.id !== action.payload
    );
};

const handleRejected = (state, action) => {
    state.contacts.loading = false;
    state.contacts.error = action.payload;
};

const contactSlice = createSlice({
    name: "contacts",
    initialState: initialContact,
    extraReducers: (builder) => {
        builder
        .addCase(fetchContacts.pending, handlePending)
        .addCase(fetchContacts.fulfilled, handleFetchFulfilled)
        .addCase(fetchContacts.rejected, handleRejected)
        .addCase(addContact.pending, handlePending)
        .addCase(addContact.fulfilled, handleAddFulfilled)
        .addCase(addContact.rejected, handleRejected)
        .addCase(deleteContact.pending, handlePending)
        .addCase(deleteContact.fulfilled, handleDeleteFulfilled)
        .addCase(deleteContact.rejected, handleRejected)
    },
});

const selectFiltersState = (state) => state.filters;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFiltersState],
    (contacts, filtersState) => {
        const {name} = filtersState;
        if (items.length > 0 && name.trim() !== "") {
            return contacts.filter((contact) => 
        contact.name.toLowerCase().includes(name.trim().toLowerCase())
        );
        }
        return contacts;
    }
);

export const selectContacts = (state) => state.contacts.items;
export const contactsReducer = contactSlice.reducer;    